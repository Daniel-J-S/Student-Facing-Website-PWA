---
track: "Full-Stack Development"
title: "Creating a Seed Route"
week: 2
day: 2
type: "lecture"
---


# Creating a Seed Route

<br>
<br>
<br>

## Lesson Objectives

1. Create a Seed Route

<br>
<br>
<br>


## Create a Seed Route

Sometimes you might need to add data to your database for testing purposes.  You can do so like this:

```javascript
app.get('/fruits/seed', (req, res) => {
    Fruit.create(
        [
            {
                name:'grapefruit',
                color:'pink',
                readyToEat:true
            },
            {
                name:'grape',
                color:'purple',
                readyToEat:false
            },
            {
                name:'avocado',
                color:'green',
                readyToEat:true
            }
        ], 
        (err, data)=>{
            res.redirect('/fruits');
        }
    )
});
```
