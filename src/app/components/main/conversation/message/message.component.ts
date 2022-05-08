import {Component, Input, OnInit} from '@angular/core';
import {MessageInterface} from 'src/app/util/dto';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @Input() message!: MessageInterface;
  @Input() isOwnMessage!: boolean;
  image!: Observable<string>;

  constructor(private fileStorage: AngularFireStorage) {}

  ngOnInit(): void {
    //this.isOwnMessage = this.message.sender == 'me';
    if (this.isFileMessage()) {
      const ref = this.fileStorage.ref(this.message.content);
      this.image = ref.getDownloadURL();
    }
  }

  isTextMessage() : boolean {
    return this.message.messageType as unknown as string == "TEXT";
  }

  isFileMessage() : boolean {
    return this.message.messageType as unknown as string == "FILE";
  }
}
