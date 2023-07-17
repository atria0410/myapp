class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :first_name, limit: 10,           comment: '名前'
      t.string :last_name, limit: 10,            comment: '苗字'
      t.string :email, limit: 256, unique: true, comment: 'メールアドレス'
      t.string :password_digest,                 comment: 'パスワード（ダイジェスト）'
      t.integer :lock_version, default: 0,       comment: '更新回数'
      t.datetime :created_at,                    comment: '作成日時'
      t.datetime :updated_at,                    comment: '更新日時'
    end
  end
end
