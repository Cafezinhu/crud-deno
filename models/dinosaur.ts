export interface IDinosaur{
    name: string;
    height: number;
    width: number;
    walkingStyle: WalkingStyle;
    eatingHabit: EatingHabit;
}

export enum WalkingStyle{bipedal, quadrupedal};

export enum EatingHabit{carnivorous, herbivorous, omnivorous};

export function getDinosaurs(): Array<IDinosaur> {
    return [{
        "name": "Stegosaurus",
        "height": 2,
        "width": 9,
        "walkingStyle": WalkingStyle.quadrupedal,
        "eatingHabit": EatingHabit.herbivorous
    }, {
        "name": "Carnotaurus",
        "height": 2.5,
        "width": 8,
        "walkingStyle": WalkingStyle.bipedal,
        "eatingHabit": EatingHabit.carnivorous
    }]
};