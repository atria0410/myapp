class UserMailer < ApplicationMailer
  def password_reset_email
    @user = params[:user]
    @token = params[:token]
    @base_url = params[:base_url]

    mail(to: @user.email, subject: 'パスワードリセットのお知らせ')
  end
end
