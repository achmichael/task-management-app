class Event{
    constructor(title, description = null, startDate = new Date(), endDate, userId ){
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.userId = userId;
    }

    data() {
        return {
            title: this.title,
            description: this.description,
            startDate: this.startDate,
            endDate: this.endDate,
            userId: this.userId,
        }
    }
}

export default Event;