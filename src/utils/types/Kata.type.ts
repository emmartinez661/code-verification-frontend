export enum KataLevel  {
    BASIC= 'Basic',     //0
    MEDIUM= 'Medium',   // 1
    HIGH= 'High'        //2
}

export type UsersVote ={
    user_id: string,
    stars: number
}

export type UserSolution ={
    user_id: string,
    solution: string
}

export type Kata={
    _id: number,
    name:string,
    description: string,
    level: string,
    intents: number, 
    stars: number,
    creator: string, //id of user
    solution: {
        solution: string,
        uSolutions: UserSolution[]
    },
     participants: {
        uv: UsersVote[]
    }
}

export type IKata = {
    name: string,
    description: string,
    level: string
}