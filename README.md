# Endpoints

## Auth Endpoints
### [POST]  /api/auth/register
### [POST]  /api/auth/login

## Client Endpoints
### [GET] /api/client/classes 
### [GET] /api/client/classes/:class_id
### [POST] /api/client/classes/
### [GET] /api/client/:user_id/classes
### [GET] /api/client/:user_id/classes/:class_id
### [DELETE] /api/client/:user_id/classes/:class_id

## Instructor Endpoints
### [GET] /api/instructor/:user_id/classes
### [GET] /api/instructor/:user_id/classes/:class_id
### [POST] /apii/nstructor/:user_id/classes/
### [PUT] /api/instructor/:user_id/classes/:class_id
### [DELETE] /api/instructor/:user_id/classes/:class_id

# ANYWHERE FITNESS BACKEND

##  https://buildweek-backend-10-21.herokuapp.com/



### ----------------  ENDPOINTS  -------------------- 

### **-----LOGIN and REGISTER-----**

### [POST]  /api/auth/register  -- creates a new user

<details>
    <summary>WHAT TO SEND </summary>

```JSON
{
    "username": "string",
    "password": "string",
    "role_id": " 'client' or 'instructor'",
}
```
role_id will be converted to actual id number, and only client or instructor will be accepted (all lowercase)
</details>

<details>
    <summary>WHAT YOU GET BACK</summary>

```JSON
{
    "user_id": "integer",
    "username": "string",
    "role_id": "integer"
}
```
</details>


### [POST]  /api/auth/login  -- logs in an existing user
<details>
    <summary> WHAT TO SEND </summary>

```JSON
{
    "username": "string",
    "password": "string"
}
```
</details>
<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "message": "Welcome back username",
    "user_id": "integer",
    "username": "username",
    "token": "TOKEN"
}
```
</details>

## **-----CLIENTS-----**

### [GET] /api/users  -- gets list of users

<details>
     <summary>WHAT YOU GET BACK</summary>

```JSON
[
    {
        "user_id": 1,
        "username": "RZA"
    },
    {
        "user_id": 2,
        "username": "GZA"
    },
    {
        "user_id": 3,
        "username": "ODB"
    }
]
```
</details>

### [GET] /api/users/:id  -- gets user by ID

<details>
     <summary>WHAT YOU GET BACK</summary>

```JSON
{
    "user_id": 1,
    "username": "RZA"
}
```
</details>

### [GET] /api/users/:id/potlucks  -- gets all the potlucks a user has been invited to 

<details>
     <summary>WHAT YOU GET BACK</summary>

```JSON
{
    "user_id": "8",
    "username": "U-God",
    "potlucks": [
        {
            "attending": 1,
            "potluck_id": 3,
            "potluck_name": "MM..FOOD",
            "organizer": "Ghostface Killah",
            "potluck_description": "got more cheese than doritos, cheetos, or fritos",
            "potluck_date": "2021-07-28T06:00:00.000Z",
            "potluck_time": "07:30:00",
            "potluck_location": "45 S 5th Ave, New York NY"
        },
        {
            "attending": 1,
            "potluck_id": 2,
            "potluck_name": "Yum Yum Food Time",
            "organizer": "GZA",
            "potluck_description": "yumyumyumyumyumyumyum",
            "potluck_date": "2021-08-20T06:00:00.000Z",
            "potluck_time": "05:00:00",
            "potluck_location": "1111 E 2222 S, SLC UT"
        }
    ]
}
```
</details>

### [GET] /api/users/:organizer_id/organizer_potlucks  -- gets all the potlucks a user has created

<details>
     <summary>WHAT YOU GET BACK</summary>

```JSON
[
    {
        "potluck_id": 1,
        "potluck_name": "Tasty Foodz Partay",
        "organizer": 3,
        "details": {
            "potluck_description": "bring the tastiest food pls.  NO BAD FOOD",
            "potluck_date": "2021-07-15T06:00:00.000Z",
            "potluck_time": "06:00:00",
            "potluck_location": "1403 Park Ave, Long Beach CA"
        }
    },
    {
        "potluck_id": 5,
        "potluck_name": "36 chambers",
        "organizer": 3,
        "details": {
            "potluck_description": "Wu Tang Clan aint nuthin to BRUNCH with",
            "potluck_date": "2021-07-28T06:00:00.000Z",
            "potluck_time": "12:00:00",
            "potluck_location": "straight from the Shaolin slums"
        }
    }
]
```
</details>


### [PUT] /api/users/:id  -- edit existing user
<details>
    <summary> WHAT TO SEND </summary>

```JSON
{
    "username": "string",
    "password": "string"
}
```
</details>
<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "user_id": 1,
    "username": "RZA"
}
```
</details>

## **-----POTLUCKS-----**

### [GET] /api/potlucks  -- get an array of potlucks

<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
[
    {
        "potluck_id": 1,
        "potluck_name": "Tasty Foodz Partay",
        "organizer": 3,
        "potluck_description": "bring the tastiest food pls.  NO BAD FOOD",
        "potluck_date": "2021-07-15T06:00:00.000Z",
        "potluck_time": "06:00:00",
        "potluck_location": "1403 Park Ave, Long Beach CA"
    },
    {
        "potluck_id": 2,
        "potluck_name": "Yum Yum Food Time",
        "organizer": 1,
        "potluck_description": "yumyumyumyumyumyumyum",
        "potluck_date": "2021-08-20T06:00:00.000Z",
        "potluck_time": "05:00:00",
        "potluck_location": "1111 E 2222 S, SLC UT"
    },
    {
        "potluck_id": 3,
        "potluck_name": "MM..FOOD",
        "organizer": 5,
        "potluck_description": "got more cheese than doritos, cheetos, or fritos",
        "potluck_date": "2021-07-28T06:00:00.000Z",
        "potluck_time": "07:30:00",
        "potluck_location": "45 S 5th Ave, New York NY"
    }
]
```
</details>

### [GET] /api/potlucks/:id  -- gets potluck by ID

<details>
     <summary>WHAT YOU GET BACK</summary>

```JSON
{
    "potluck_id": 3,
    "potluck_name": "MM..FOOD",
    "details": {
        "organizer": "Raekwon",
        "potluck_description": "got more cheese than doritos, cheetos, or fritos",
        "potluck_date": "2021-07-28T06:00:00.000Z",
        "potluck_time": "07:30:00",
        "potluck_location": "45 S 5th Ave, New York NY"
    }
}
```
</details>

### [GET] /api/potlucks/:id/users  -- gets the users for a specific potluck 

<details>
     <summary>WHAT YOU GET BACK</summary>

```JSON
{
    "potluck_id": 2,
    "potluck_name": "Yum Yum Food Time",
    "details": {
        "organizer": 1,
        "potluck_description": "yumyumyumyumyumyumyum",
        "potluck_date": "2021-08-20T06:00:00.000Z",
        "potluck_time": "05:00:00",
        "potluck_location": "1111 E 2222 S, SLC UT"
    },
    "users": [
        {
            "user_id": 4,
            "username": "Method Man",
            "attending": "attending"
        },
        {
            "user_id": 3,
            "username": "ODB",
            "attending": "not attending"
        }
    ]
}
```
</details>

### [GET] /api/potlucks/:id/foods  -- gets the foods for a specific potluck 

<details>
     <summary>WHAT YOU GET BACK</summary>

```JSON
{
    "potluck_id": 3,
    "foods": [
        {
            "food_id": 1,
            "food_name": "Pineapple",
            "food_description": "part pine, part apple"
        },
        {
            "food_id": 2,
            "food_name": "Sweet Potatoes",
            "food_description": "mashed?  fried?  u choose"
        },
        {
            "food_id": 6,
            "food_name": "Ramen",
            "food_description": ""
        }
    ]
}
```
</details>












### [POST] /api/potlucks/:id/users  -- adds a user to a potluck
<details>
    <summary> WHAT TO SEND </summary>

```JSON
{
   "potluck_id": 2,
   "user_id": 8,
   "attending": 1 //0 for not attending, 1 for attending
}
```
</details>
<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "potluck_id": 2,
    "potluck_name": "Yum Yum Food Time",
    "details": {
        "organizer": 1,
        "potluck_description": "yumyumyumyumyumyumyum",
        "potluck_date": "2021-08-20T06:00:00.000Z",
        "potluck_time": "05:00:00",
        "potluck_location": "1111 E 2222 S, SLC UT"
    },
    "users": [
        {
            "user_id": 4,
            "username": "Method Man",
            "attending": "attending"
        },
        {
            "user_id": 3,
            "username": "ODB",
            "attending": "not attending"
        },
        {
            "user_id": 8,
            "username": "U-God",
            "attending": "attending"
        }
    ]
}
```
</details>

### [POST] /api/potlucks/:id/foods  -- adds a food item to a potluck
<details>
    <summary> WHAT TO SEND </summary>

```JSON
{
    "potluck_id": 3,
    "food_id": 2
}
```
</details>
<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "potluck_id": 3,
    "foods": [
        {
            "food_id": 1,
            "food_name": "Pineapple",
            "food_description": "part pine, part apple",
            "potluck_food_id": 4
        },
        {
            "food_id": 2,
            "food_name": "Sweet Potatoes",
            "food_description": "mashed?  fried?  u choose",
            "potluck_food_id": 18
        },
        {
            "food_id": 5,
            "food_name": "Masala",
            "food_description": "better make me sweat",
            "potluck_food_id": 20
        }
    ]
}
```
</details>


### [POST] /api/potlucks  -- creates a new potluck
<details>
    <summary> WHAT TO SEND </summary>

```JSON
{
    "potluck_name": "string",
    "potluck_description": "optional string",
    "potluck_date": "2021-07-28  must be this format",
    "potluck_time": "12:00:00 must be this format",
    "potluck_location": "string",
    "organizer": "integer"

}
```
</details>
<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "potluck_id": 3,
    "potluck_name": "MM..FOOD",
    "details": {
        "organizer": "Raekwon",
        "potluck_description": "got more cheese than doritos, cheetos, or fritos",
        "potluck_date": "2021-07-28T06:00:00.000Z",
        "potluck_time": "07:30:00",
        "potluck_location": "45 S 5th Ave, New York NY"
    }
}
```
</details>

### [PUT] /api/potlucks/:id  -- updates an existing potluck
<details>
    <summary> WHAT TO SEND </summary>

```JSON
{
    "potluck_name": "string",
    "potluck_description": "optional string",
    "potluck_date": "2021-07-28  must be this format",
    "potluck_time": "12:00:00 must be this format",
    "potluck_location": "string",
    "organizer": "integer"

}
```
</details>
<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "potluck_id": 3,
    "potluck_name": "MM..FOOD",
    "details": {
        "organizer": "Raekwon",
        "potluck_description": "got more cheese than doritos, cheetos, or fritos",
        "potluck_date": "2021-07-28T06:00:00.000Z",
        "potluck_time": "07:30:00",
        "potluck_location": "45 S 5th Ave, New York NY"
    }
}
```
</details>




### [DELETE] /api/potlucks/:id  -- delete existing potluck

<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "potluck_id": 3,
    "potluck_name": "MM..FOOD",
    "details": {
        "organizer": "Raekwon",
        "potluck_description": "got more cheese than doritos, cheetos, or fritos",
        "potluck_date": "2021-07-28T06:00:00.000Z",
        "potluck_time": "07:30:00",
        "potluck_location": "45 S 5th Ave, New York NY"
    }
}
```
</details>

### [DELETE] /api/potlucks/:potluck_food_id/foods  -- delete existing food item in a potluck

<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
"successfully removed item"
```
</details>

## **-----FOODS-----**

### [GET] /api/foods  -- get an array of all foods

<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
[
    {
        "food_id": 1,
        "food_name": "Pineapple",
        "food_description": "part pine, part apple"
    },
    {
        "food_id": 2,
        "food_name": "Sweet Potatoes",
        "food_description": "mashed?  fried?  u choose"
    },
    {
        "food_id": 3,
        "food_name": "Pizza",
        "food_description": "Veeeeegan pls"
    }
]
```
</details>

### [GET] /api/foods/:id  -- gets food by ID

<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "food_id": 1,
    "food_name": "Pineapple",
    "food_description": "part pine, part apple"
}
```
</details>

### [POST] /api/foods  -- create new food item

<details>
    <summary> WHAT TO SEND </summary>

```JSON
{
    "food_name": "Quesadilla",
    "food_description": " optional string"
}
```
</details>
<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "food_id": 8,
    "food_name": "Quesadilla",
    "food_description": "no description yet"
}
```
</details>

### [PUT] /api/foods/:id  -- update existing food item

<details>
    <summary> WHAT TO SEND </summary>

```JSON
{
    "food_name": "Fajitas",
    "food_description": " optional string"
}
```
</details>
<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "food_id": 8,
    "food_name": "Fajitas",
    "food_description": "no description yet"
}
```
</details>

### [DELETE] /api/foods/:id  -- delete existing food item

<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "food_id": 8,
    "food_name": "Masala",
    "food_description": "no description yet"
}
```
</details>
