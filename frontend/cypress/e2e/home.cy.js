describe(
  "HomePage", 
  () => {
    it("shoud visit HomePage", () => {
      cy.visit("/")
      cy.contains("li", "Basegun est une application" )
    })
  }
)