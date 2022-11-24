export interface IDuck
{
    name: string;
    makeSound: (sound: string) => void;
}

const duck1: IDuck = {
    name: "Huey",
    makeSound: (sound: any) => console.log(sound)
}

const duck2: IDuck = {
    name: "Buey",
    makeSound: (sound: any) => console.log(sound)
}

duck1.makeSound('quack');

export const ducks = [duck1, duck2];