class Togo {
  //locators
  taskHeader() {
    return cy.get(".panel-heading");
  }

  todoInput() {
    return cy.get("#input-add");
  }

  addButton() {
    return cy.get("#add-btn");
  }
  searchField() {
    return cy.get("#search");
  }

  NoTasksfound() {
    return cy.get(".todo-item > p");
  }
  taskList1() {
    return cy.get(".todo-item");
  }

  DeleteButton() {
    return cy.get('[data-icon="trash-can"]');
  }

  checkicon() {
    return cy.get('[data-icon="circle-check"]');
  }

  linedOutTask() {
    return cy.get('.mr-auto > [style="text-decoration: line-through;"]');
  }

  RemoveCompletedTasksButton() {
    return cy.get("#clear");
  }

  errormessage() {
    return cy.get(".notification");
  }
  //methods
}
export default Togo;
