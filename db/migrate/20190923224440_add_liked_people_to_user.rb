class AddLikedPeopleToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :liked_people, :text
  end
end
