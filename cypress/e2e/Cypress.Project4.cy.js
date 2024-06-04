/// <reference types="Cypress"/>
import Togo from "../../pages/pages";

const togo = new Togo();
describe("Techglobal Todo-App", () => {
  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend/project-6");
  });
  it("Test Case 01 - Todo-App Modal Verification", () => {
    togo.taskHeader().should("be.visible");
    togo.todoInput().should("be.enabled");
    togo.addButton().should("be.enabled");
    togo.searchField().should("be.enabled");
    togo.NoTasksfound().should("have.text", "No tasks found!");
  });

  it("Test Case 02 - Single Task Addition and Removal", () => {
    togo.todoInput().type("task 1{enter}");
    togo.taskList1().should("have.text", "task 1").and("have.length", 1);
    togo.checkicon().click();
    togo.linedOutTask().should("be.visible");
    togo.DeleteButton().click();
    togo.NoTasksfound().should("have.text", "No tasks found!");
    togo.todoInput().clear().type("task 1{enter}");
    togo.taskList1().should("have.text", "task 1").and("have.length", 1);
    togo.checkicon().click();
    togo.linedOutTask().should("be.visible");
    togo.RemoveCompletedTasksButton().click();
    togo.NoTasksfound().should("have.text", "No tasks found!");
  });

  it("Test Case 03 - Multiple Task Operations", () => {
    const items = ["task 1", "task 2", "task 3", "task 4", "task 5"];
    items.forEach((item) => {
      togo.todoInput().type(`${item}{enter}`).clear();
    });
    togo.taskList1().each((el, index) => {
      cy.wrap(el).should("have.text", items[index]).and("be.visible");
    });
    togo.checkicon().each((el) => {
      cy.wrap(el).click();
    });
    togo.RemoveCompletedTasksButton().click();
    togo.NoTasksfound().should("have.text", "No tasks found!");
  });

  it("Test Case 04 - Search and Filter Functionality in todo App", () => {
    const items = ["task 1", "task 2", "task 3", "task 4", "task 5"];
    items.forEach((item) => {
      togo.todoInput().type(`${item}{enter}`).clear();
    });
    togo.taskList1().each((el, index) => {
      cy.wrap(el).should("have.text", items[index]).and("be.visible");
    });
    items.forEach((item) => {
      togo.searchField().type(item);
      togo
        .taskList1()
        .should("have.text", item)
        .and("have.length", 1)
        .and("be.visible");
      togo.searchField().clear();
    });
  });

  it("Test Case 05 - Task Validation and Error Handling", () => {
    togo.todoInput().type(" {enter}");
    togo.NoTasksfound().should("have.text", "No tasks found!");
    togo
      .todoInput()
      .type(
        "afdlkjasljfgha;osdjgoiasj;goiajsdf;lkgja;asasdasdasdasflskdgjasd{enter}"
      );
    togo
      .errormessage()
      .should("have.text", "Error: Todo cannot be more than 30 characters!")
      .and("be.visible");
    togo.todoInput().clear();
    togo.todoInput().type("task1{enter}");
    togo.taskList1().should("have.length", 1);
    togo.todoInput().clear();
    togo.todoInput().type("task1{enter}");
    togo
      .errormessage()
      .should("have.text", "Error: You already have task1 in your todo list.");
  });
});
