class Task {

  constructor(title, description, status, deadline, userId) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.deadline = deadline;
    this.userId = userId;
  }

  data() {
    return {
      title: this.title,
      description: this.description,
      status: this.status,
      deadline: this.deadline,
      userId: this.userId,
    };
  }
}

export default Task;
