export interface IDinosaur{
    name: string;
    height: number;
    width: number;
    walkingStyle: WalkingStyle;
    eatingHabit: EatingHabit;
}

export enum WalkingStyle{bipedal, quadrupedal};

export enum EatingHabit{carnivore, herbivore};
