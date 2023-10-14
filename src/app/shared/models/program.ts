export interface Program {
    id: string;
    show: string;
    startHour: string;
    endHour: string;
    theme: string;
    presenters: string[];
    guests: string;
    rerun : boolean
}