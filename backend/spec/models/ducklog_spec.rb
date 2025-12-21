require 'rails_helper'

describe Ducklog do
  describe 'validations' do
    it 'title必須' do
      ducklog = Ducklog.new(title: nil, content: '内容')
      expect(ducklog).not_to be_valid
    end

    it 'content必須' do
      ducklog = Ducklog.new(title: 'タイトル', content: nil)
      expect(ducklog).not_to be_valid
    end

    it '有効なデータが保存できる' do
      ducklog = Ducklog.new(title: 'タイトル', content: '内容')
      expect(ducklog).to be_valid
    end
  end
end