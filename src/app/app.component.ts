import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {MessageSseService} from "./sse/message.sse.service";
import {MessageList} from "./dto/message-list";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front';

  constructor(private messageService : MessageSseService) {
  }

  ngOnInit(): void {
    $('#action_menu_btn').click(function(){
      $('.action_menu').toggle();
    });

    const emitter = this.messageService.getMessages(environment['message_push_api'] + '/user/test');

    emitter.subscribe((data: MessageList) => {
      console.log(data)
    })

  }
}
