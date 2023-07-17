class Api::V1::SessionsController < ApplicationController
  # CSRFトークンをクッキーにセット
  def set_csrf_token
    cookies['CSRF-TOKEN'] = form_authenticity_token
  end

  # サインイン
  def sign_in
    user = User.new(sign_in_params)

    if user.save
      session[:user_id] = user.id
      render json: { result: 'OK' }
    else
      render json: { result: 'NG', errors: user.errors.as_json(full_messages: true) }
    end
  end

  # ログイン
  def log_in
    user = User.find_by(email: params[:email].downcase)

    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: { result: 'OK' }
    else
      render json: { result: 'NG' }
    end
  end

  # ログアウト
  def log_out
    session.delete(:user_id)
    render json: { result: 'OK' }
  end

  # パスワードリセットメール送信
  def send_password_reset_email
    # メールアドレスからユーザー情報を取得
    user = User.find_by(email: params[:email].downcase)

    render json: { result: 'NG', message: 'メールアドレスが登録されていません' } and return if user.nil?

    # ワンタイムパスワード生成
    token = user.signed_id(purpose: 'password_reset', expires_in: 15.minutes)
    # ベースURL
    base_url = request.base_url

    # メール送信
    UserMailer.with(user:, token:, base_url:).password_reset_email.deliver_later

    render json: { result: 'OK', message: 'メールを送信しました' }
  end

  # パスワードリセット
  def password_reset
    user = User.find_signed(params[:token], purpose: 'password_reset')

    render json: { result: 'NG', message: '有効期限が切れています。メール送信からやり直してください' } and return if user.nil?

    user.password = params[:password]
    user.password_confirmation = params[:password_confirmation]

    if user.save
      render json: { result: 'OK', message: 'パスワードを変更しました' }
    else
      render json: { result: 'NG', message: '処理中にエラーが発生しました' }
    end
  end

  # 現在のユーザー取得
  def current_user
    current_user = User.without_password.find_by(id: session[:user_id])

    render json: { current_user: }
  end

  private

  # ストロングパラメータ（サインイン）
  def sign_in_params
    params.require(:session).permit(
      :first_name,
      :last_name,
      :email,
      :password,
      :password_confirmation
    )
  end
end
