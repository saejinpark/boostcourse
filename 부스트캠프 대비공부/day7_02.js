let person = {
    name: ["Bob", "Smith"],
    age: 32,
    gender: "male",
    interests: ["music", "skiing"],
    bio: function () {
        console.log(
            this.name[0] +
                "" +
                this.name[1] +
                "is" +
                this.age +
                "years old, He likes" +
                this.interests[0] +
                "and" +
                this.interests[1] +
                "."
        );
    },
    greeting: function () {
        console.log("Hi! i'm" + this.name[0] + ".");
    },
};

person.bio();
person.greeting();
console.log(person);

