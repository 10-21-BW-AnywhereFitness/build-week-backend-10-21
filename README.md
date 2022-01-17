# ANYWHERE FITNESS BACKEND

##  https://buildweek-backend-10-21.herokuapp.com/

### TABLES
#### Classes:
```JSON
{
    class_id: int, 
    class_name: string,
    class_type: string,
    class_date: date,
    class_time: time,
    class_description: string,
    class_intensity: string,
    class_location: string,
    class_registered_clients: int,
    class_max: int,
    user_id (FK): int
}
```

#### Roles:
```JSON
{
    role_id: int,
    role_type: string
}
```

#### Reservations:
```JSON
{
    reservation_id: int,
    user_id (FK): int, 
    class_id (FK): int
}
```

#### Users:
```JSON
{
    user_id: int,
    username: string,
    password, string,
    role_id(FK): int
}
```




### **-----LOGIN and REGISTER-----**

### [POST]  /api/auth/register  -- creates a new user


role_id will be converted to actual id number, and only client or instructor will be accepted (all lowercase)
    <summary>WHAT TO SEND </summary>
    
```JSON
{
    "username": "string",
    "password": "string",
    "role_id": " 'client' or 'instructor'",
}
```

    <summary>WHAT YOU GET BACK</summary>

```JSON
{
    "user_id": "integer",
    "username": "string",
    "role_id": "integer"
}
```


### [POST]  /api/auth/login  -- logs in an existing user

    <summary> WHAT TO SEND </summary>

```JSON
{
    "username": "string",
    "password": "string"
}
```

    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "user_id": "integer",
    "role_id": "integer",
    "message": "Welcome back username",
    "token": "TOKEN"
}
```

## **-----CLIENTS (NO AUTH NEEDED)-----**

### [GET] /api/client/public/classes (no auth)


     <summary>WHAT YOU GET BACK</summary>

```JSON
[
    {
        "class_name": "Ride through the Alps",
        "class_date": "2021-10-15T07:00:00.000Z",
        "class_time": "09:00:00",
        "class_description": "Imagine bike travel but better"
    },
    {
        "class_name": "Relaxing Yoga",
        "class_date": "2021-10-21T07:00:00.000Z",
        "class_time": "18:00:00",
        "class_description": "Namaste"
    },
    {
        "class_name": "Bangin' Bhangra",
        "class_date": "2021-10-31T07:00:00.000Z",
        "class_time": "12:00:00",
        "class_description": "Bollywood dancing!"
    },
    {
        "class_name": "test",
        "class_date": "2021-10-31T07:00:00.000Z",
        "class_time": "09:00:00",
        "class_description": "BLAH BLAH BLAH"
    }
]
```


## **-----CLIENTS (AUTH NEEDED)-----**

### [GET] /api/client/classes -- gets list of all available classes


     <summary>WHAT YOU GET BACK</summary>

```JSON
[
    {
        "class_id": 1,
        "class_name": "Ride through the Alps",
        "class_type": "Spin",
        "class_date": "2021-10-15T07:00:00.000Z",
        "class_time": "09:00:00",
        "class_duration": 60,
        "class_description": "Imagine bike travel but better",
        "class_intensity": "medium",
        "class_registered_clients": 2,
        "class_max": 35
    },
    {
        "class_id": 2,
        "class_name": "Relaxing Yoga",
        "class_type": "Yoga",
        "class_date": "2021-10-21T07:00:00.000Z",
        "class_time": "18:00:00",
        "class_duration": 60,
        "class_description": "Namaste",
        "class_intensity": "low",
        "class_registered_clients": 3,
        "class_max": 20
    },
    {
        "class_id": 3,
        "class_name": "Bangin' Bhangra",
        "class_type": "Dance",
        "class_date": "2021-10-31T07:00:00.000Z",
        "class_time": "12:00:00",
        "class_duration": 30,
        "class_description": "Bollywood dancing!",
        "class_intensity": "high",
        "class_registered_clients": 0,
        "class_max": 10
    },
    {
        "class_id": 4,
        "class_name": "test",
        "class_type": "running",
        "class_date": "2021-10-31T07:00:00.000Z",
        "class_time": "09:00:00",
        "class_duration": 30,
        "class_description": "BLAH BLAH BLAH",
        "class_intensity": "high",
        "class_registered_clients": 2,
        "class_max": 5
    }
]
```


### [GET] /api/client/classes/:class_id -- gets one class by id

     <summary>WHAT YOU GET BACK</summary>

```JSON
{
    "class_id": 1,
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

### [GET] /api/client/:user_id/classes -- gets all the classes that the user has a reservation for 


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


### [GET] /api/client/:user_id/classes/:class_id -- get one class that the user has a reservation for by its class_id


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



### [POST] /api/client/classes/:class_id-- creates a new class reservation
    <summary> WHAT TO SEND </summary>
    Don't need to send anything -- it will just need to be routed properly

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


###  [DELETE] /api/client/:user_id/classes/:class_id -- deletes a class reservation for that specific user and updates the class_registered_clients key

    <summary> WHAT TO SEND </summary>
    Don't need to send anything -- it will just need to be routed properly

    <summary> WHAT YOU GET BACK </summary>
class_registered_clients will decrement by 1 each time a user deletes their preexisting class reservation.

```JSON
{
    "message": "Reservation deleted!"
}
```


## **-----INSTRUCTORS (AUTH NEEDED)-----**

### [GET] /api/instructor/:user_id/classes -- gets all the classes that the instructor is teaching

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


### [GET] /api/instructor/:user_id/classes/:class_id -- get 1 particular class a logged-in instructor wants to look at by class_id


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


### [POST] /api/instructor/:user_id/classes/-- authenticated instructor creates new class

    <summary> WHAT TO SEND </summary>
    - class_time was not able to be validated, but it needs to be included
    - class_intensity needs to be one of the below words, all lowercase

    update: Added the ability to add a description (which is optional)

```JSON
{
    "class_name": "string", 
    "class_type": "string", 
    "class_date": "MM/DD/YYYY", 
    "class_time": "HH:MM", 
    "class_duration": "integer", 
    "class_description": "string (optional)",
    "class_intensity": " 'low', 'medium', or 'high' ", 
    "class_location": "string",
    "class_registered_clients": "integer, but will default to 0 if left blank",
    "class_max": "integer but will default to 5 if left blank"
} 
```

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




### [PUT] /api/instructor/:user_id/classes/:class_id -- authenticated instructor updates a pre-existing class's information

    <summary> WHAT TO SEND </summary>

```JSON
{
    "class_name": "string", 
    "class_type": "string", 
    "class_date": "MM/DD/YYYY must be this format", 
    "class_time": "HH:MM must be this format", 
    "class_duration": "integer", 
    "class_intensity": " 'low', 'medium', or 'high' ", 
    "class_location": "string",
    "class_registered_clients": "integer, but will default to 0 if left blank",
    "class_max": "integer but will default to 5 if left blank"
}
```

    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "user_id": 3,
    "class_id": 6,
    "class_name": "INSANITY",
    "class_type": "HIIT",
    "class_date": "2021-10-31T07:00:00.000Z",
    "class_time": "09:00:00",
    "class_duration": 30,
    "class_intensity": "high",
    "class_location": "home",
    "class_registered_clients": 2,
    "class_max": 5
}
```


### [DELETE] /api/instructor/:user_id/classes/:class_id -- delete existing class


    <summary> WHAT YOU GET BACK </summary>
    will also delete all reservations that people have made for this class.
```JSON
{
    "message": "Class successfully deleted!"
}
```

