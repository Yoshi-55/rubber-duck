class AddNullConstraintToDucklogs < ActiveRecord::Migration[7.2]
  def change
    change_column_null :ducklogs, :title, false
    change_column_null :ducklogs, :content, false
  end
end
