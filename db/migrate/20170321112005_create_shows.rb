class CreateShows < ActiveRecord::Migration[5.1]
  def change
    create_table :shows do |t|
      t.string :station
      t.date :on_on
      t.string :starts
      t.string :title
      t.string :desc
      t.string :finishes
      t.string :info_url

      t.timestamps
    end
  end
end
