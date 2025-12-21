FactoryBot.define do
  factory :ducklog do
    sequence(:title) { |n| "Test Ducklog Title #{n}" }
    content { "This is test ducklog content" }
  end
end
