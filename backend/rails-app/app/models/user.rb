class User < ApplicationRecord
  has_secure_password

  default_scope { order(id: :asc) }

  # パスワードは取得しない
  def self.without_password
    select(column_names - ['password_digest'])
  end

  # 検索
  def self.search(search_word)
    where('first_name LIKE ?', "%#{search_word}%")
      .or(where('last_name LIKE ?', "%#{search_word}%"))
      .or(where('email LIKE ?', "%#{search_word}%"))
  end

  # CSVエクスポート
  def self.csv_export
    CSV.generate do |csv|
      csv << %w[id first_name last_name email]
      all.each do |user|
        csv << [user.id, user.first_name, user.last_name, user.email]
      end
    end
  end

  # CSVインポート
  def self.csv_import(file)
    # レコードをシンボルキーハッシュに変換
    records = CSV.foreach(file, headers: true).map do |row|
      row.to_h.transform_keys(&:to_sym)
    end

    # 登録 or 更新
    records.each do |record|
      user = find_or_initialize_by(id: record[:id])
      user.first_name = record[:first_name]
      user.last_name = record[:last_name]
      user.email = record[:email]
      user.save!
    end
  end

  # バリデーション
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true
end
