class CreatePeople < ActiveRecord::Migration[6.0]
  def change
    create_table :people do |t|
      t.string :name
      t.string :registry
      t.string :avatar

      t.timestamps
    end
  end
end
