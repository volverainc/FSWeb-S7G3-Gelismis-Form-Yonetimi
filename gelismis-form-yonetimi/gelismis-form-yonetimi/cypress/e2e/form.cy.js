describe('Form testleri', function() {
    beforeEach(()=> {
        cy.visit('http://localhost:3000');
    })
    it("sadece name'i bos birak, name hatasi var mi bak", function() {
      cy.get('[data-cy=input-lastname]').type('afas')
      cy.get('[data-cy=input-name]').type('emre');
      cy.get('[data-cy=input-name]').clear();
    //   cy.get("[data-cy=input-name]").first().should("have.value", "emre");
      cy.get('[data-cy=email-input]').type('emre@example.com');
      cy.get('[data-cy=pass-input]').type('examplepass');
      cy.get('[data-cy=input-terms]').check();
      cy.get('[data-cy=input-submit]').click({force: true})
      cy.get('[data-cy=error-name]').should('be.visible');
    });
    it("sadece name'i bos birak, name hatasi var mi bak", function() {
        cy.get('[data-cy=input-lastname]').type('afas')
        cy.get('[data-cy=input-name]').type('emre');
        cy.get('[data-cy=input-lastname]').clear();
      //   cy.get("[data-cy=input-name]").first().should("have.value", "emre");
        cy.get('[data-cy=email-input]').type('emre@example.com');
        cy.get('[data-cy=pass-input]').type('examplepass');
        cy.get('[data-cy=input-terms]').check();
        cy.get('[data-cy=input-submit]').click({force: true})
        cy.get('[data-cy=error-name]').should('not.be.visible');
      });
      it("sadece name'i bos birak, name hatasi var mi bak", function() {
        cy.get('[data-cy=input-lastname]').type('afas')
        cy.get('[data-cy=input-name]').type('emre');
        cy.get('[data-cy=input-name]').clear();
        // cy.get("[data-cy=input-name]").first().should("have.value", "emre");
        cy.get('[data-cy=email-input]').type('emre@example.com');
        cy.get('[data-cy=pass-input]').type('examplepass');
        cy.get('[data-cy=input-terms]').check();
        cy.get('[data-cy=input-submit]').click({force: true})
        cy.get('[data-cy=error-name]').should('be.visible').contains('your first name');
      });
    it('form dolduktan sonra button disabled mi', function() {
        cy.get('[data-cy=input-name]').type('emre');
        cy.get("[data-cy=input-name]").first().should("have.value", "emre");
        cy.get('[data-cy=email-input]').type('emre@example.com');
        cy.get('[data-cy=pass-input]').type('examplepass');
        cy.get('[data-cy=input-terms]').check();
        cy.get('[data-cy=input-submit]').should('be.disabled')
        cy.get('[data-cy=input-name]').clear();
        cy.get('.invalid-feedback').should('be.visible');
      });
    //   it('kayitli kullanici geliyor mu', function() {
    //     cy.get('[data-cy=input-name]').type('emre');
    //     cy.get("[data-cy=input-name]").first().should("have.value", "emre");
    //     cy.get('[data-cy=email-input]').type('emre@example.com');
    //     cy.get('[data-cy=pass-input]').type('examplepass');
    //     cy.get('[data-cy=input-terms]').check();
    //     cy.get('[data-cy=input-submit]').click({force: true})
    //     cy.get('[data-cy=input-name]').clear();
    //     cy.get('.invalid-feedback').should('be.visible');
    //   });
  });
  
  describe('success / fail', function() {
    beforeEach(()=> {
        cy.visit('http://localhost:3000');
    })
    it.skip("success", function() {
      cy.get('[data-cy=input-lastname]').type('afas')
      cy.get('[data-cy=input-name]').type('emre');
      cy.get('[data-cy=email-input]').type('emre@example.com');
      cy.get('[data-cy=pass-input]').type('examplepass');
      cy.get('[data-cy=input-terms]').check();
      cy.get('[data-cy=input-submit]').click()
      cy.get('[data-cy=eklenen]').should('be.visible');
      cy.get('[data-cy=sil]').click();
    });
    it("bos test", function () {})
    it("success", function() {
        cy.get('[data-cy=input-lastname]').type('afas')
        cy.get('[data-cy=input-name]').type('emre');
        cy.get('[data-cy=email-input]').type('emre@example.com');
        cy.get('[data-cy=pass-input]').type('examplepass');
        cy.get('[data-cy=input-terms]').check();
        cy.get('[data-cy=input-submit]').click()
        // cy.get('[data-cy=eklenen]').should('be.visible');
        cy.get('[data-cy=sil]').click();
        cy.get('[data-cy=eklenen]').should('not.exist');
      });
})