export default async function (data, uri) {
    let result = await fetch(uri, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log("Fetch Error: " + err);
        });
    return result;
}

export async function getCaroselData() {
    return Promise.resolve(
        {
            payload: [
                {
                    "src": "https://picsum.photos/700/350?random=1",
                    "title": "Explore the Future of Technology",
                    "description": "Dive into cutting-edge innovations that are shaping tomorrow's world.",
                    "addedOn": "2024-12-01T10:00:00Z"
                },
                {
                    "src": "https://picsum.photos/700/350?random=2",
                    "title": "Adventure Awaits",
                    "description": "Discover breathtaking destinations and unforgettable experiences.",
                    "addedOn": "2024-12-02T12:00:00Z"
                },
                {
                    "src": "https://picsum.photos/700/350?random=3",
                    "title": "Healthy Living Tips",
                    "description": "Learn how to live a healthier, more balanced life.",
                    "addedOn": "2024-12-03T15:30:00Z"
                },
                {
                    "src": "https://picsum.photos/700/350?random=4",
                    "title": "Exclusive Deals",
                    "description": "Don't miss out on our limited-time offers and discounts.",
                    "addedOn": "2024-12-04T14:20:00Z"
                },
                {
                    "src": "https://picsum.photos/700/350?random=5",
                    "title": "Innovative Solutions",
                    "description": "Explore products and services designed to meet your needs.",
                    "addedOn": "2024-12-05T09:45:00Z"
                }
            ]
        });
}

export async function getPostsData() {
    return Promise.resolve(
        {
            payload: {
                posts: [
                    {
                        "post_date": "2024-12-09T10:00:00Z",
                        "posted_article": {
                            "_id": "647f1e3e01bc2c4f00123abc",
                            "article_tile": "WOMEN'S DENIM JACKET",
                            "article_description": "A classic denim jacket with a modern fit, perfect for layering over a casual outfit or pairing with a dress for a chic look.",
                            "price": 59.99,
                            "pret_unitate_masura": "647f2e4f04de6d1e00157efb",
                            "quantity_left_on_stock": 15,
                            "addedOn": "2024-12-01T10:00:00Z",
                            "cathegory": "647f2e4e04de6d1e00157efc",
                            "article_img_src": "https://picsum.photos/600/800?random=1"
                        },
                        "post_user_name": {
                            "_id": "648a2e4f04de6d1e00157efc",
                            "user_name": "user1",
                            "gender": "male",
                            "user_img_src": "https://picsum.photos/50/50?random=1",
                            "email": "user1@example.com",
                            "first_name": "John",
                            "last_name": "Doe",
                            "password": "hashedpassword1",
                            "age": 25,
                            "createdAt": "2024-12-01T09:30:00Z",
                            "last_succesfull_login": "2024-12-01T09:00:00Z",
                            "last_wrong_login_attempts": 0,
                            "all_loggins": 10,
                            "account_disabled": false,
                            "account_type": "User"
                        },
                        "likes": 15,
                        "users_who_liked_this_post": [
                            "649f2e4e03de6d1e00154aec",
                            "650a2e4d04de6d1e00157efd"
                        ]
                    },
                    {
                        "post_date": "2024-12-08T15:30:00Z",
                        "posted_article": {
                            "_id": "648f1e3f01bc2c4f00123bcd",
                            "article_tile": "MENS COTTON T-SHIRT",
                            "article_description": "A comfortable and breathable cotton t-shirt, ideal for everyday wear. Perfect for pairing with jeans or shorts.",
                            "price": 19.99,
                            "pret_unitate_masura": "648f2e4f04de6d1e00157efb",
                            "quantity_left_on_stock": 10,
                            "addedOn": "2024-12-02T12:00:00Z",
                            "cathegory": "648f2e4e04de6d1e00157efc",
                            "article_img_src": "https://picsum.photos/600/800?random=2"
                        },
                        "post_user_name": {
                            "_id": "649b2e4e04de6d1e00157efd",
                            "user_name": "user2",
                            "gender": "female",
                            "user_img_src": "https://picsum.photos/50/50?random=2",
                            "email": "user2@example.com",
                            "first_name": "Jane",
                            "last_name": "Smith",
                            "password": "hashedpassword2",
                            "age": 30,
                            "createdAt": "2024-12-02T11:30:00Z",
                            "last_succesfull_login": "2024-12-02T10:45:00Z",
                            "last_wrong_login_attempts": 1,
                            "all_loggins": 20,
                            "account_disabled": false,
                            "account_type": "User"
                        },
                        "likes": 30,
                        "users_who_liked_this_post": [
                            "650f2e4e03de6d1e00154aed"
                        ]
                    },
                    {
                        "post_date": "2024-12-07T18:45:00Z",
                        "posted_article": {
                            "_id": "649f1e3f01bc2c4f00123cde",
                            "article_tile": "WOMENS FLORAL DRESS",
                            "article_description": "A beautiful floral dress that is perfect for spring or summer events. Its lightweight fabric and vibrant print make it an elegant choice.",
                            "price": 49.99,
                            "pret_unitate_masura": "649f2e4f04de6d1e00157efb",
                            "quantity_left_on_stock": 20,
                            "addedOn": "2024-12-03T15:30:00Z",
                            "cathegory": "649f2e4e04de6d1e00157efc",
                            "article_img_src": "https://picsum.photos/600/800?random=3"
                        },
                        "post_user_name": {
                            "_id": "650b2e4e04de6d1e00157efc",
                            "user_name": "user3",
                            "gender": "male",
                            "user_img_src": "https://picsum.photos/50/50?random=3",
                            "email": "user3@example.com",
                            "first_name": "Michael",
                            "last_name": "Brown",
                            "password": "hashedpassword3",
                            "age": 35,
                            "createdAt": "2024-12-03T14:45:00Z",
                            "last_succesfull_login": "2024-12-03T14:00:00Z",
                            "last_wrong_login_attempts": 2,
                            "all_loggins": 15,
                            "account_disabled": false,
                            "account_type": "User"
                        },
                        "likes": 10,
                        "users_who_liked_this_post": []
                    },
                    {
                        "post_date": "2024-12-06T09:20:00Z",
                        "posted_article": {
                            "_id": "650f1e3f01bc2c4f00123def",
                            "article_tile": "MENS LEATHER JACKET",
                            "article_description": "A stylish leather jacket that adds a touch of sophistication to any outfit. Perfect for cooler weather and casual outings.",
                            "price": 89.99,
                            "pret_unitate_masura": "650f2e4f04de6d1e00157efb",
                            "quantity_left_on_stock": 5,
                            "addedOn": "2024-12-04T14:20:00Z",
                            "cathegory": "650f2e4e04de6d1e00157efc",
                            "article_img_src": "https://picsum.photos/600/800?random=4"
                        },
                        "post_user_name": {
                            "_id": "647b2e4f04de6d1e00157efb",
                            "user_name": "user4",
                            "gender": "female",
                            "user_img_src": "https://picsum.photos/50/50?random=4",
                            "email": "user4@example.com",
                            "first_name": "Emily",
                            "last_name": "Davis",
                            "password": "hashedpassword4",
                            "age": 28,
                            "createdAt": "2024-12-04T13:30:00Z",
                            "last_succesfull_login": "2024-12-04T12:45:00Z",
                            "last_wrong_login_attempts": 3,
                            "all_loggins": 5,
                            "account_disabled": false,
                            "account_type": "User"
                        },
                        "likes": 25,
                        "users_who_liked_this_post": [
                            "648a2e4e04de6d1e00154aec"
                        ]
                    },
                    {
                        "post_date": "2024-12-05T13:15:00Z",
                        "posted_article": {
                            "_id": "651f1e3f01bc2c4f00123efg",
                            "article_tile": "WOMEN'S SPORTS BRA",
                            "article_description": "A supportive sports bra designed for high-impact activities. It offers excellent comfort and breathability, making it perfect for workouts.",
                            "price": 24.99,
                            "pret_unitate_masura": "651f2e4f04de6d1e00157efb",
                            "quantity_left_on_stock": 25,
                            "addedOn": "2024-12-05T09:45:00Z",
                            "cathegory": "651f2e4e04de6d1e00157efc",
                            "article_img_src": "https://picsum.photos/600/800?random=5"
                        },
                        "post_user_name": {
                            "_id": "649a2e4e04de6d1e00157efc",
                            "user_name": "user5",
                            "gender": "male",
                            "user_img_src": "https://picsum.photos/50/50?random=5",
                            "email": "user5@example.com",
                            "first_name": "Sarah",
                            "last_name": "Williams",
                            "password": "hashedpassword5",
                            "age": 22,
                            "createdAt": "2024-12-05T08:30:00Z",
                            "last_succesfull_login": "2024-12-05T07:30:00Z",
                            "last_wrong_login_attempts": 0,
                            "all_loggins": 12,
                            "account_disabled": false,
                            "account_type": "User"
                        },
                        "likes": 18,
                        "users_who_liked_this_post": [
                            "648a2e4e04de6d1e00154aed"
                        ]
                    }
                ],
                comments: [
                    {
                        "comment_date": "2024-12-09T12:00:00Z",
                        "user_who_commented": {
                            "_id": "647f1e3e01bc2c4f00123abc",
                            "user_name": "user1",
                            "gender": "male",
                            "user_img_src": "https://picsum.photos/50/50?random=1",
                            "email": "user1@example.com",
                            "first_name": "John",
                            "last_name": "Doe",
                            "password": "hashedpassword1",
                            "age": 25,
                            "createdAt": "2024-12-01T10:00:00Z",
                            "last_succesfull_login": "2024-12-02T09:30:00Z",
                            "last_wrong_login_attempts": 2,
                            "all_loggins": 15,
                            "account_disabled": false,
                            "account_type": "User"
                        },
                        "post_id": "647f1e3e01bc2c4f00123aba",
                        "comment_text": "This looks amazing, I could totally see myself wearing this!"
                    },
                    {
                        "comment_date": "2024-12-09T13:00:00Z",
                        "user_who_commented": {
                            "_id": "649f2e4e04de6d1e00157efc",
                            "user_name": "user2",
                            "gender": "female",
                            "user_img_src": "https://picsum.photos/50/50?random=2",
                            "email": "user2@example.com",
                            "first_name": "Jane",
                            "last_name": "Smith",
                            "password": "hashedpassword2",
                            "age": 30,
                            "createdAt": "2024-12-02T11:30:00Z",
                            "last_succesfull_login": "2024-12-02T10:45:00Z",
                            "last_wrong_login_attempts": 1,
                            "all_loggins": 20,
                            "account_disabled": false,
                            "account_type": "User"
                        },
                        "post_id": "647f1e3e01bc2c4f00123aba",
                        "comment_text": "Perfect choice for a night out!"
                    },
                    {
                        "comment_date": "2024-12-09T11:45:00Z",
                        "user_who_commented": {
                            "_id": "649f2e4e04de6d1e00157efd",
                            "user_name": "user3",
                            "gender": "male",
                            "user_img_src": "https://picsum.photos/50/50?random=3",
                            "email": "user3@example.com",
                            "first_name": "Mike",
                            "last_name": "Johnson",
                            "password": "hashedpassword3",
                            "age": 28,
                            "createdAt": "2024-12-01T12:00:00Z",
                            "last_succesfull_login": "2024-12-02T11:00:00Z",
                            "last_wrong_login_attempts": 0,
                            "all_loggins": 18,
                            "account_disabled": false,
                            "account_type": "User"
                        },
                        "post_id": "647f1e3e01bc2c4f00123abe",
                        "comment_text": "This is a must-have for my wardrobe!"
                    },
                    {
                        "comment_date": "2024-12-09T12:45:00Z",
                        "user_who_commented": {
                            "_id": "647f2e4e04de6d1e00157efd",
                            "user_name": "user4",
                            "gender": "female",
                            "user_img_src": "https://picsum.photos/50/50?random=4",
                            "email": "user4@example.com",
                            "first_name": "Alice",
                            "last_name": "Brown",
                            "password": "hashedpassword4",
                            "age": 32,
                            "createdAt": "2024-12-02T08:00:00Z",
                            "last_succesfull_login": "2024-12-02T07:30:00Z",
                            "last_wrong_login_attempts": 3,
                            "all_loggins": 25,
                            "account_disabled": false,
                            "account_type": "User"
                        },
                        "post_id": "647f1e3e01bc2c4f00123abe",
                        "comment_text": "Elegant and classy, love it!"
                    },
                    {
                        "comment_date": "2024-12-09T14:00:00Z",
                        "user_who_commented": {
                            "_id": "649f2e4e04de6d1e00157efe",
                            "user_name": "user5",
                            "gender": "male",
                            "user_img_src": "https://picsum.photos/50/50?random=5",
                            "email": "user5@example.com",
                            "first_name": "David",
                            "last_name": "Wilson",
                            "password": "hashedpassword5",
                            "age": 27,
                            "createdAt": "2024-12-01T09:30:00Z",
                            "last_succesfull_login": "2024-12-02T08:15:00Z",
                            "last_wrong_login_attempts": 4,
                            "all_loggins": 10,
                            "account_disabled": false,
                            "account_type": "User"
                        },
                        "post_id": "647f1e3e01bc2c4f00123abf",
                        "comment_text": "Can't wait to buy this!"
                    }
                ]

            }
        })
}
