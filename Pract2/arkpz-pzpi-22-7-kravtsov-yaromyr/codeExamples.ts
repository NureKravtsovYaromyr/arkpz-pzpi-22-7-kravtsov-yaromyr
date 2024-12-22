//Метод 1 – Remove Parameter
//До рефакторингу:
function calculateDiscount(price: number, isMember: boolean) {
    if (isMember) {
        return price * 0.9;
    }
    return price;
}

calculateDiscount(100, true);

//Після рефакторингу:
function calculateMemberDiscount(price: number) {
    return price * 0.9;
}

calculateMemberDiscount(100);

//Метод 2 – Remove Setting Method
//До рефакторингу:
class User {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    setName(newName: string) {
        this.name = newName;
    }
}

//Після рефакторингу:
class User {
    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }
}

//Метод 3 – Remove Middle Man
//До рефакторингу:
class Department {
    manager: string;

    constructor(manager: string) {
        this.manager = manager;
    }
}

class Employee {
    private department: Department;

    constructor(department: Department) {
        this.department = department;
    }

    getManager() {
        return this.department.manager;
    }
}


//Після рефакторингу:
class Department {
    manager: string;

    constructor(manager: string) {
        this.manager = manager;
    }
}






