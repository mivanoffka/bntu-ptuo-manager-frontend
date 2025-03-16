export class Name {
    _firstName: string | null;
    _lastName: string | null;
    _middleName: string | null;

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

    get middleName() {
        return this._lastName;
    }

    get full() {
        return `${this.lastName} ${this.firstName} ${this.middleName}`;
    }

    constructor(
        firstName: string | null,
        lastName: string | null,
        middleName: string | null
    ) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._middleName = middleName;
    }
}
