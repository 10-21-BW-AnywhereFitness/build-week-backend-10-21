
### [PUT] /api/instructor/:user_id/classes/:class_id
### [DELETE] /api/instructor/:user_id/classes/:class_id

# ANYWHERE FITNESS BACKEND

##  https://buildweek-backend-10-21.herokuapp.com/



### ----------------  ENDPOINTS  -------------------- 

### **-----LOGIN and REGISTER-----**

### [POST]  /api/auth/register  -- creates a new user

<details>
role_id will be converted to actual id number, and only client or instructor will be accepted (all lowercase)
    <summary>WHAT TO SEND </summary>
    
```JSON
{
    "username": "string",
    "password": "string",
    "role_id": " 'client' or 'instructor'",
}
```

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
    "token": "TOKEN"
}
```
</details>

## **-----CLIENTS (AUTH NEEDED)-----**

### [GET] /api/client/classes -- gets list of all available classes

<details>
     <summary>WHAT YOU GET BACK</summary>

```JSON
[
    {
        "class_name": "Ride through the Alps",
        "class_type": "Spin",
        "class_date": "2021-10-15T07:00:00.000Z",
        "class_time": "09:00:00",
        "class_duration": 60,
        "class_intensity": "medium",
        "class_registered_clients": 2,
        "class_max": 35
    },
    {
        "class_name": "Relaxing Yoga",
        "class_type": "Yoga",
        "class_date": "2021-10-21T07:00:00.000Z",
        "class_time": "18:00:00",
        "class_duration": 60,
        "class_intensity": "low",
        "class_registered_clients": 3,
        "class_max": 20
    },
    {
        "class_name": "Bangin' Bhangra",
        "class_type": "Dance",
        "class_date": "2021-10-31T07:00:00.000Z",
        "class_time": "12:00:00",
        "class_duration": 30,
        "class_intensity": "high",
        "class_registered_clients": 0,
        "class_max": 10
    },
]
```
</details>

### [GET] /api/client/classes/:class_id -- gets one class by id

<details>
     <summary>WHAT YOU GET BACK</summary>

```JSON
{
    "class_name": "Bangin' Bhangra",
    "class_type": "Dance",
    "class_date": "2021-10-31T07:00:00.000Z",
    "class_time": "12:00:00",
    "class_duration": 30,
    "class_intensity": "high",
    "class_registered_clients": 0,
    "class_max": 10
}
```
</details>

### [GET] /api/client/:user_id/classes -- gets all the classes that the user has a reservation for 

<details>
     <summary>WHAT YOU GET BACK</summary>

```JSON
[
    {
        "class_id": 1,
        "reservation_id": 1,
        "class_name": "Bangin' Bhangra",
        "class_type": "Dance",
        "class_date": "2021-10-31T07:00:00.000Z",
        "class_time": "12:00:00",
        "class_registered_clients": 0
    },
    {
        "class_id": 3,
        "reservation_id": 4,
        "class_name": "Ride through the Alps",
        "class_type": "Spin",
        "class_date": "2021-10-15T07:00:00.000Z",
        "class_time": "09:00:00",
        "class_registered_clients": 2
    }
]
```
</details>

### [GET] /api/client/:user_id/classes/:class_id -- get one class that the user has a reservation for by its class_id

<details>
     <summary>WHAT YOU GET BACK</summary>

```JSON
{
    "class_id": 3,
    "reservation_id": 4,
    "class_name": "Ride through the Alps",
    "class_type": "Spin",
    "class_date": "2021-10-15T07:00:00.000Z",
    "class_time": "09:00:00",
    "class_registered_clients": 2
}
```
</details>


### [POST] /api/client/classes/-- creates a new class reservation
<details>
    <summary> WHAT TO SEND </summary>
    Don't need to send anything -- it will just need to be routed properly
</details>
<details>
    <summary> WHAT YOU GET BACK </summary>
class_registered_clients will increment by 1 each time a NEW CLIENT makes a class reservation. Each user will only be able to register for any 1 class once unless they delete their reservation and make a new one

```JSON
{
    "class_name": "twinkle bats",
    "class_type": "YOGAAAAAAA",
    "class_date": "2021-11-21T08:00:00.000Z",
    "class_time": "09:00:00",
    "class_duration": 30,
    "class_registered_clients": 3,
    "class_max": 5
}
```
</details>

###  [DELETE] /api/client/:user_id/classes/:class_id -- deletes a class reservation for that specific user and updates the class_registered_clients key
<details>
    <summary> WHAT TO SEND </summary>
    Don't need to send anything -- it will just need to be routed properly
</details>
<details>
    <summary> WHAT YOU GET BACK </summary>
class_registered_clients will decrement by 1 each time a user deletes their preexisting class reservation.

```JSON
{
    "message": "Reservation deleted!"
}
```
</details>

## **-----INSTRUCTOR (AUTH NEEDED)-----**

### [GET] /api/instructor/:user_id/classes -- gets all the classes that the instructor is teaching

<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
[
    {
        "user_id": 4,
        "class_id": 3,
        "class_name": "Ride through the Alps",
        "class_type": "Spin",
        "class_date": "2021-10-15T07:00:00.000Z",
        "class_time": "09:00:00",
        "class_duration": 60,
        "class_intensity": "medium",
        "class_location": "San Francisco",
        "class_registered_clients": 2,
        "class_max": 35
    },
    {
        "user_id": 4,
        "class_id": 2,
        "class_name": "Relaxing Yoga",
        "class_type": "Yoga",
        "class_date": "2021-10-21T07:00:00.000Z",
        "class_time": "18:00:00",
        "class_duration": 60,
        "class_intensity": "low",
        "class_location": "Berkeley",
        "class_registered_clients": 3,
        "class_max": 20
    }
]
```
</details>

### [GET] /api/instructor/:user_id/classes/:class_id -- get 1 particular class a logged-in instructor wants to look at by class_id

<details>
     <summary>WHAT YOU GET BACK</summary>

```JSON
{
    "user_id": 4,
    "class_id": 3,
    "class_name": "Ride through the Alps",
    "class_type": "Spin",
    "class_date": "2021-10-15T07:00:00.000Z",
    "class_time": "09:00:00",
    "class_duration": 60,
    "class_intensity": "medium",
    "class_location": "San Francisco",
    "class_registered_clients": 2,
    "class_max": 35
}
```
</details>

### [POST] /api/instructor/:user_id/classes/-- authenticated instructor creates new class
<details>
    <summary> WHAT TO SEND </summary>
    - class_time was not able to be validated, but it needs to be included
    - class_intensity needs to be one of the below words, all lowercase

```JSON
{
    "class_name": "string", 
    "class_type": "string", 
    "class_date": "MM/DD/YYYY", 
    "class_time": "HH:MM", 
    "class_duration": "integer", 
    "class_intensity": " 'low', 'medium', or 'high' ", 
    "class_location": "string",
    "class_registered_clients": "integer, but will default to 0 if left blank",
    "class_max": "integer but will default to 5 if left blank"
} 
```
</details>
<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "user_id": "integer",
    "class_id": "integer",
    "class_name": "string",
    "class_type": "string",
    "class_date": "YYYY-MM-DDT07:00:00.000Z",
    "class_time": "HH:MM:SS",
    "class_duration": "integer",
    "class_intensity": "string",
    "class_location": "string",
    "class_registered_clients": "integer",
    "class_max": "integer"
}
```
</details>

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
