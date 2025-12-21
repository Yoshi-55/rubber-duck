require 'rails_helper'

describe 'Ducklogs API', type: :request do
  describe 'GET /ducklogs' do
    it 'returns all ducklogs' do
      FactoryBot.create_list(:ducklog, 3)
      get '/ducklogs', as: :json, headers: { 'Host' => 'localhost' }
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'POST /ducklogs' do
    it 'creates a ducklog' do
      post '/ducklogs',
           params: { ducklog: { title: 'Test', content: 'Test content' } },
           as: :json,
           headers: { 'Host' => 'localhost' }
      expect(response).to have_http_status(:created)
    end
  end

  describe 'PATCH /ducklogs/:id' do
    it 'updates a ducklog' do
      ducklog = FactoryBot.create(:ducklog)
      patch "/ducklogs/#{ducklog.id}",
            params: { ducklog: { title: 'Updated' } },
            as: :json,
            headers: { 'Host' => 'localhost' }
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'DELETE /ducklogs/:id' do
    it 'deletes a ducklog' do
      ducklog = FactoryBot.create(:ducklog)
      delete "/ducklogs/#{ducklog.id}", as: :json, headers: { 'Host' => 'localhost' }
      expect(response).to have_http_status(:no_content)
    end
  end
end
