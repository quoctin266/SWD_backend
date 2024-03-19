interface ISlot {
    beginAt: string;
    endAt: String;
    capacity: number;
}
export declare const generateSlots: () => ISlot[];
export {};
