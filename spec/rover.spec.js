const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  // Test 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let constructorCheck = new Rover(1);
      expect(constructorCheck.position).toStrictEqual(1);
      expect(constructorCheck.mode).toBe('NORMAL');
      expect(constructorCheck.generatorWatts).toBe(110);
  });
  // Test 8
  it("response returned by receiveMessage contains the name of the message", function() {
    let messageCheck = new Message("name", ["command1", "command2"]);
    let newRover = new Rover(1);
    expect(newRover.receiveMessage(messageCheck).message).toStrictEqual("name");
  });
  // Test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("STATUS_CHECK"), ];
    let message = new Message("Test message with two commands", commands);
    let rover = new Rover(98382); // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    expect(response.results.length).toStrictEqual(message.commands.length);
  });
  // Test 10
  it("responds correctly to the status check command", function() {
    let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("STATUS_CHECK"),];
    let message = new Message("Test message with two commands", commands);
    let rover = new Rover(98382); // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    let roverStatus = {
      position: rover.position,
      mode: rover.mode,
      generatorWatts: rover.generatorWatts
    }
    expect(roverStatus).toStrictEqual({"position": rover.position, "mode": rover.mode, "generatorWatts": rover.generatorWatts});
  });
  // Test 11
  it("responds correctly to the mode change command", function() {
    let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("STATUS_CHECK"),];
    let message = new Message("Test message with two commands", commands);
    let rover = new Rover(98382); // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    let roverStatus = {
      position: rover.position,
      mode: rover.mode,
      generatorWatts: rover.generatorWatts,
    }
    expect(response.results[0]).toStrictEqual({"completed": true});
  });
  // Test 12
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
      let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("MOVE", 70501), new Command("STATUS_CHECK"),];
      let message = new Message("Test message with three commands", commands);
      let rover = new Rover(98382); // Passes 98382 as the rover's position.
      let response = rover.receiveMessage(message);
      let roverStatus = {
        position: rover.position,
        mode: rover.mode,
        generatorWatts: rover.generatorWatts,
      };
      expect(response.results[1]).toStrictEqual({ completed: false });
  });
  // Test 13
  it("responds with the position for the move command", function() {
    let commands = [new Command("MOVE", 70501), new Command("STATUS_CHECK"),];
    let message = new Message("Test message with two commands", commands);
    let rover = new Rover(98382); // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    let roverStatus = {
      position: rover.position,
      mode: rover.mode,
      generatorWatts: rover.generatorWatts,
    };
    expect(rover.position).toStrictEqual(70501);
  });

}); 
