class Api::V1::UsersController < ApplicationController
  # ユーザー一覧取得
  def index
    users = User.without_password
                .search(params[:search_word])
                .page(params[:page])
                .per(params[:page_size])
                .order(params[:sort]&.to_unsafe_h&.map { |key, val| "#{key} #{val}" }&.join(', '))

    count = User.search(params[:search_word]).count

    render json: { users:, count: }
  end

  # ユーザー取得
  def show
    user = User.without_password.find(params[:id])

    render json: user
  end

  # ユーザー作成
  def create
    user = User.new(user_params)

    if user.save
      render json: { result: 'OK' }
    else
      render json: { result: 'NG', errors: user.errors.as_json(full_messages: true) }
    end
  end

  # ユーザー更新
  def update
    user = User.find(params[:id])

    if user.update(user_params)
      render json: { result: 'OK' }
    else
      render json: { result: 'NG', errors: user.errors.as_json(full_messages: true) }
    end
  end

  # ユーザー削除
  def destroy
    user = User.find(params[:id])

    if user.destroy
      render json: { result: 'OK' }
    else
      render json: { result: 'NG' }
    end
  end

  # バリデーション
  def validates
    user = User.find_or_initialize_by(id: params[:user][:id])
    user.assign_attributes(user_params)

    result = user.valid? ? 'OK' : 'NG'
    errors = user.errors.as_json(full_messages: true)

    render json: { result:, errors: }
  end

  # CSVエクスポート
  def csv_export
    csv = User.csv_export

    send_data csv, filename: 'users.csv'
  end

  # CSVインポート
  def csv_import
    ActiveRecord::Base.transaction do
      User.csv_import(params[:csv])

      render json: { result: 'OK', message: 'success' }
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { result: 'NG', message: e.record.errors.full_messages }
  end

  private

  # ストロングパラメータ
  def user_params
    params.require(:user).permit(
      :first_name,
      :last_name,
      :email,
      :password,
      :password_confirmation,
      :lock_version
    )
  end
end
