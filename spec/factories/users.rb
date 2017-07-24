FactoryGirl.define do
  factory :user do
    name 'Test'
    password '123'
    sequence(:email) { |n| "person#{n}@example.com" }

    after(:create) do |user|
      create_list(:order, 5, user: user)
    end
  end

  factory :order do
    address 'Address'
    amount 100
    user

    after(:create) do |order|
      create_list(:order_item, 5, order: order)
    end
  end

  factory :order_item do
    qty 1
    item_info {{info: 'info'}}
    details {{size: 'XL'}}
    order
  end

end
