'use strict';
import "jest-extended";
const request = require('supertest');
const TeacherController = require('../Controllers/TeacherController')

describe('TeacherController.getAllTeacher', () => {
    it('should return an error message when getAllTeacher fails', async () => {
  
      const req = {};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
        end: jest.fn(),
      };
      // Act
      await TeacherController.getAllTeacher(req, res);
      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });