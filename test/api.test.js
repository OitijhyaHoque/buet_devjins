const request = require('supertest'); 
const express = require('express'); 
 
const app = express(); 
 
app.get('/submit', (req, res) => { 
  res.status(200).json({ 
    name: req.body.name, 
    address: req.body.address, 
    n_id: req.body.n_id, 
  }); 
}); 
 
const server = app.listen(3000); 
 
describe('Vaccination Registration Form', () => { 
  it('should return a 200 status code', (done) => { 
    request(server) 
      .get('/submit') 
      .expect(200) 
      .end((err, res) => { 
        if (err) { 
          done(err); 
        } else { 
          done(); 
        } 
      }); 
  }); 
 
  it('should return the user\'s name, address, and NID', (done) => { 
    request(server) 
      .get('/submit') 
      .expect(200) 
      .expect('name', 'John Doe') 
      .expect('address', '123 Main Street') 
      .expect('n_id', 123456789) 
      .end((err, res) => { 
        if (err) { 
          done(err); 
        } else { 
          done(); 
        } 
      }); 
  }); 
});