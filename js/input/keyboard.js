/*

  Name:     keyboard.js
  Created:  20-08-2017 13-31
  Owner:    Gaprosys

*/
addEventListener("keydown", keyPressed);
addEventListener("keyup", keyUp);

function keyUp(evt) {
  switch(evt.which) {
		case 16:
      keyboard_pressed.isShift = false;
		break;
		case 17:
      keyboard_pressed.isStrg = false;
		break;
    case 18:
      keyboard_pressed.isAlt = false;
    break;
		case 225:
			keyboard_pressed.isAltGraph = false;
		break;
	}
}

function keyPressed(evt) {
  var keyValue = evt.which;
  console.log(evt.which);
  switch(evt.which) {
    case 8: //Backspace
      modifiyText("^AAAH");
    break;
    case 9: //Tab
      modifiyText("^AAAI");
    break;
    case 13: // Enter
      modifiyText("^AAAM");
    break;
    case 16:
      keyboard_pressed.isShift = true;
    break;
    case 17:
      keyboard_pressed.isStrg = true;
    break;
    case 18: // Alt
      keyboard_pressed.isAlt = true;
    break;
		case 19: // Pause und Unterbrechung
		break;
		case 33: // Bild Hoch
			modifiyText("^AAAE");
		break;
		case 34: // Bild Runter
			modifiyText("^AAAF");
		break;
		case 35: // Ende
			modifiyText("^AAAK");
		break;
		case 36: // Pos1
			modifiyText("^AAAL");
		break;
    case 37: // Arrow Left
      modifiyText("^AAAA");
    break;
    case 38: // Arrow Up
      modifiyText("^AAAB");
    break;
    case 39: // Arrow Right
      modifiyText("^AAAC");
    break;
    case 40: // Arrow Down
      modifiyText("^AAAD");
    break;
		case 45: // Einfuegen
			modifiyText("^AAAG");
		break;
    case 46: // Entf
      modifiyText("^AABH");
    break;
    case 91: //Windows- Key
    break;
    case 93: // Context- Menu
    break;
		case 112:
		case 113:
		case 114:
		case 115:
		case 116:
		case 117:
		case 118:
		case 119:
		case 120:
		case 121:
		case 122:
		case 123:
			return false;
		break;
		case 144: // NumLock
		break;
		case 145: // ScrollLock
		break;
		case 187:
			if(evt.key == '+' || evt.key == '*' || evt.key == '~') {
				modifiyText(evt.key);
			} else if(keyboard_pressed.isShift == true) {
				modifiyText("`");
			} else {
				modifiyText("´");
			}
		break;
		case 192:
			if(keyboard_pressed.isShift == false) {
				modifiyText("^");
			} else {
				modifiyText("°");
			}
		break;
		case 225: // Alt Gr
			keyboard_pressed.isAltGraph = true;
		break;
    default:
      modifiyText(evt.key);
    break;
  }
}
