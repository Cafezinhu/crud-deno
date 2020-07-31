export class Dinosaur{
    constructor(
        public name: string,
        public height: number,
        public width: number,
        public walkingStyle: WalkingStyle,
        public eatingHabit: EatingHabit,
        public id?: number){}
}

export enum WalkingStyle{bipedal = "bipedal", quadrupedal = "quadrupedal"};

export enum EatingHabit{carnivorous = "carnivorous", herbivorous = "herbivorous", omnivorous = "omnivorous"};