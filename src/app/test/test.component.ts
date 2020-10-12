import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  populate() {
    /*sessionStorage.setItem('orders', '[{"companyId":"c0","id":"b842f317-88be-44e4-8e90-8df4f4a46c16","name":"Test Order","description":"","products":[{"quantity":1,"template":{"companyId":"c0","id":"87e50189-3e11-4dbb-b667-c677bc5aa8b1","name":"Test Product","processTemplates":[{"companyId":"c0","id":"f8462039-ed62-4901-8cfb-0db66ced2798","name":"Test Process","estimatedTime":null,"mainTasks":[],"stepTemplates":[{"title":"Unnamed Step0","keyMessage":null,"tasks":null,"materials":[],"toolIds":[],"pictureUris":[],"videoUris":[]},{"title":"Unnamed Step1","keyMessage":null,"tasks":null,"materials":[],"toolIds":[],"pictureUris":[],"videoUris":[]}],"previousComments":null}],"processTemplateIds":["f8462039-ed62-4901-8cfb-0db66ced2798"]},"templateId":"87e50189-3e11-4dbb-b667-c677bc5aa8b1"}],"status":"released"},{"companyId":"c0","id":"555ca905-5f6b-49fc-9cb4-e45f77d967d6","name":"Boat Order","description":"","products":[{"quantity":1,"template":{"companyId":"c0","id":"1102858f-449b-43c5-ab3b-72f8786386a0","name":"Boat 3000","processTemplates":[{"companyId":"c0","id":"fc6dfe06-4aac-453d-849f-ba9765b9a7e2","name":"Sail","estimatedTime":5400,"mainTasks":["Cut","Sew"],"stepTemplates":[{"title":"Cut","keyMessage":null,"tasks":null,"materials":["Cloth"],"toolIds":["Scissor"],"pictureUris":[],"videoUris":[]},{"title":"Sew","keyMessage":null,"tasks":null,"materials":["String"],"toolIds":["Sewing machine"],"pictureUris":[],"videoUris":[]},{"title":"Visual Inspection","keyMessage":null,"tasks":null,"materials":[],"toolIds":[],"pictureUris":[],"videoUris":[]}],"previousComments":null},{"companyId":"c0","id":"f887b5ce-eaaa-4f37-aed5-3e6101fff549","name":"Rudder","estimatedTime":9000,"mainTasks":["Craft"],"stepTemplates":[{"title":"Gather materials","keyMessage":null,"tasks":null,"materials":["Wood"],"toolIds":[],"pictureUris":[],"videoUris":[]},{"title":"Craft","keyMessage":null,"tasks":null,"materials":[],"toolIds":["Chisel","Saw"],"pictureUris":[],"videoUris":[]}],"previousComments":null}],"processTemplateIds":["fc6dfe06-4aac-453d-849f-ba9765b9a7e2","f887b5ce-eaaa-4f37-aed5-3e6101fff549"]},"templateId":"1102858f-449b-43c5-ab3b-72f8786386a0"}],"status":"in_preparation"}]');
    sessionStorage.setItem('productTemplates', '[{"companyId":"c0","id":"87e50189-3e11-4dbb-b667-c677bc5aa8b1","name":"Test Product","processTemplates":[{"companyId":"c0","id":"f8462039-ed62-4901-8cfb-0db66ced2798","name":"Test Process","estimatedTime":null,"mainTasks":[],"stepTemplates":[{"title":"Unnamed Step0","keyMessage":null,"tasks":null,"materials":[],"toolIds":[],"pictureUris":[],"videoUris":[]},{"title":"Unnamed Step1","keyMessage":null,"tasks":null,"materials":[],"toolIds":[],"pictureUris":[],"videoUris":[]}],"previousComments":null}],"processTemplateIds":["f8462039-ed62-4901-8cfb-0db66ced2798"]},{"companyId":"c0","id":"1102858f-449b-43c5-ab3b-72f8786386a0","name":"Boat 3000","processTemplates":[{"companyId":"c0","id":"fc6dfe06-4aac-453d-849f-ba9765b9a7e2","name":"Sail","estimatedTime":5400,"mainTasks":["Cut","Sew"],"stepTemplates":[{"title":"Cut","keyMessage":null,"tasks":null,"materials":["Cloth"],"toolIds":["Scissor"],"pictureUris":[],"videoUris":[]},{"title":"Sew","keyMessage":null,"tasks":null,"materials":["String"],"toolIds":["Sewing machine"],"pictureUris":[],"videoUris":[]},{"title":"Visual Inspection","keyMessage":null,"tasks":null,"materials":[],"toolIds":[],"pictureUris":[],"videoUris":[]}],"previousComments":null},{"companyId":"c0","id":"f887b5ce-eaaa-4f37-aed5-3e6101fff549","name":"Rudder","estimatedTime":9000,"mainTasks":["Craft"],"stepTemplates":[{"title":"Gather materials","keyMessage":null,"tasks":null,"materials":["Wood"],"toolIds":[],"pictureUris":[],"videoUris":[]},{"title":"Craft","keyMessage":null,"tasks":null,"materials":[],"toolIds":["Chisel","Saw"],"pictureUris":[],"videoUris":[]}],"previousComments":null}],"processTemplateIds":["fc6dfe06-4aac-453d-849f-ba9765b9a7e2","f887b5ce-eaaa-4f37-aed5-3e6101fff549"]},{"companyId":"c0","id":"be8fe5cd-1405-475a-9a4a-d09b05122383","name":"Unnamed Product 2","processTemplates":[],"processTemplateIds":[]}]');
    sessionStorage.setItem('processes', '[{"companyId":"c0","id":"92184274-ac75-4ede-9ab0-c291605410c1","orderId":"b842f317-88be-44e4-8e90-8df4f4a46c16","status":"in_progress","template":{"companyId":"c0","id":"f8462039-ed62-4901-8cfb-0db66ced2798","name":"Test Process","estimatedTime":null,"mainTasks":[],"stepTemplates":[{"title":"Unnamed Step0","keyMessage":null,"tasks":null,"materials":[],"toolIds":[],"pictureUris":[],"videoUris":[]},{"title":"Unnamed Step1","keyMessage":null,"tasks":null,"materials":[],"toolIds":[],"pictureUris":[],"videoUris":[]}],"previousComments":null},"estimatedTime":null,"mainTasks":[],"name":"Test Process","previousComments":null,"steps":[{"title":"Unnamed Step0","keyMessage":null,"tasks":null,"materials":[],"toolIds":[],"pictureUris":[],"videoUris":[],"timeTaken":0},{"title":"Unnamed Step1","keyMessage":null,"tasks":null,"materials":[],"toolIds":[],"pictureUris":[],"videoUris":[],"timeTaken":0}],"timeTaken":4783,"currentStepIndex":0,"assignedUserId":"5f4411a4e9dc5b57b4a9782b","isOccupied":false,"isRunning":false,"templateId":"f8462039-ed62-4901-8cfb-0db66ced2798"}]');
    sessionStorage.setItem('processTemplates', '[{"companyId":"c0","id":"f8462039-ed62-4901-8cfb-0db66ced2798","name":"Test Process","estimatedTime":null,"mainTasks":[],"stepTemplates":[{"title":"Unnamed Step0","keyMessage":null,"tasks":null,"materials":[],"toolIds":[],"pictureUris":[],"videoUris":[]},{"title":"Unnamed Step1","keyMessage":null,"tasks":null,"materials":[],"toolIds":[],"pictureUris":[],"videoUris":[]}],"previousComments":null},{"companyId":"c0","id":"fc6dfe06-4aac-453d-849f-ba9765b9a7e2","name":"Sail","estimatedTime":5400,"mainTasks":["Cut","Sew"],"stepTemplates":[{"title":"Cut","keyMessage":null,"tasks":null,"materials":["Cloth"],"toolIds":["Scissor"],"pictureUris":[],"videoUris":[]},{"title":"Sew","keyMessage":null,"tasks":null,"materials":["String"],"toolIds":["Sewing machine"],"pictureUris":[],"videoUris":[]},{"title":"Visual Inspection","keyMessage":null,"tasks":null,"materials":[],"toolIds":[],"pictureUris":[],"videoUris":[]}],"previousComments":null},{"companyId":"c0","id":"f887b5ce-eaaa-4f37-aed5-3e6101fff549","name":"Rudder","estimatedTime":9000,"mainTasks":["Craft"],"stepTemplates":[{"title":"Gather materials","keyMessage":null,"tasks":null,"materials":["Wood"],"toolIds":[],"pictureUris":[],"videoUris":[]},{"title":"Craft","keyMessage":null,"tasks":null,"materials":[],"toolIds":["Chisel","Saw"],"pictureUris":[],"videoUris":[]}],"previousComments":null}]');
    */

    sessionStorage.setItem('productTemplates', '[{"companyId":"c0","id":"647e3942-ec1e-4336-ace7-2c447d278aac","name":"Boat 3000","processTemplates":[{"companyId":"c0","id":"d39fc645-e857-4667-8477-78d8f4a2a01f","name":"Sail","estimatedTime":9000,"mainTasks":["cut cloth","sew sail"],"stepTemplates":[{"title":"Cutting","keyMessage":"be careful with your hands!","tasks":"do some cutting","materials":["cloth"],"toolIds":["scissor"],"pictureUris":["https://ullmansails.com/wp-content/uploads/2016/03/Ullman-Sails-Design-Image-Four-V2.jpg"],"videoUris":[]},{"title":"Sewing","keyMessage":"do it precisely!","tasks":"Do some sewing....","materials":["cloth","string"],"toolIds":["scissor","sewing machine"],"pictureUris":["https://ullmansails.com/wp-content/uploads/2016/03/Ullman-Sails-Design-Image-Four-V2.jpg"],"videoUris":[]}],"previousComments":null},{"companyId":"c0","id":"8ea1cd37-b071-45fe-846b-d046c32216da","name":"Rudder","estimatedTime":5400,"mainTasks":["cut wood","grind raw rudder"],"stepTemplates":[{"title":"Cutting","keyMessage":"be careful with your hands","tasks":"do some cutting....","materials":["wood"],"toolIds":["saw"],"pictureUris":[],"videoUris":[]},{"title":"Grinding","keyMessage":"do it precisely","tasks":"do some grinding...","materials":["raw rudder"],"toolIds":["grinder"],"pictureUris":[],"videoUris":[]}],"previousComments":null}],"processTemplateIds":["d39fc645-e857-4667-8477-78d8f4a2a01f","8ea1cd37-b071-45fe-846b-d046c32216da"]},{"companyId":"c0","id":"4c977342-caaa-4526-9d0a-ecfd61565e71","name":"Unnamed Product 2","processTemplates":[],"processTemplateIds":[]}]');
    sessionStorage.setItem('processTemplates', '[{"companyId":"c0","id":"d39fc645-e857-4667-8477-78d8f4a2a01f","name":"Sail","estimatedTime":9000,"mainTasks":["cut cloth","sew sail"],"stepTemplates":[{"title":"Cutting","keyMessage":"be careful with your hands!","tasks":"do some cutting","materials":["cloth"],"toolIds":["scissor"],"pictureUris":["https://ullmansails.com/wp-content/uploads/2016/03/Ullman-Sails-Design-Image-Four-V2.jpg"],"videoUris":[]},{"title":"Sewing","keyMessage":"do it precisely!","tasks":"Do some sewing....","materials":["cloth","string"],"toolIds":["scissor","sewing machine"],"pictureUris":["https://ullmansails.com/wp-content/uploads/2016/03/Ullman-Sails-Design-Image-Four-V2.jpg"],"videoUris":[]}],"previousComments":null},{"companyId":"c0","id":"8ea1cd37-b071-45fe-846b-d046c32216da","name":"Rudder","estimatedTime":5400,"mainTasks":["cut wood","grind raw rudder"],"stepTemplates":[{"title":"Cutting","keyMessage":"be careful with your hands","tasks":"do some cutting....","materials":["wood"],"toolIds":["saw"],"pictureUris":[],"videoUris":[]},{"title":"Grinding","keyMessage":"do it precisely","tasks":"do some grinding...","materials":["raw rudder"],"toolIds":["grinder"],"pictureUris":[],"videoUris":[]}],"previousComments":null}]');
    sessionStorage.setItem('orders', '[{"companyId":"c0","id":"3471b21d-793e-408f-8078-708f82c39e9a","name":"Showcase Order","description":"Fully populated showcas order","products":[{"quantity":3,"template":{"companyId":"c0","id":"647e3942-ec1e-4336-ace7-2c447d278aac","name":"Boat 3000","processTemplates":[{"companyId":"c0","id":"d39fc645-e857-4667-8477-78d8f4a2a01f","name":"Sail","estimatedTime":9000,"mainTasks":["cut cloth","sew sail"],"stepTemplates":[{"title":"Cutting","keyMessage":"be careful with your hands!","tasks":"do some cutting","materials":["cloth"],"toolIds":["scissor"],"pictureUris":["https://ullmansails.com/wp-content/uploads/2016/03/Ullman-Sails-Design-Image-Four-V2.jpg"],"videoUris":[]},{"title":"Sewing","keyMessage":"do it precisely!","tasks":"Do some sewing....","materials":["cloth","string"],"toolIds":["scissor","sewing machine"],"pictureUris":["https://ullmansails.com/wp-content/uploads/2016/03/Ullman-Sails-Design-Image-Four-V2.jpg"],"videoUris":[]}],"previousComments":null},{"companyId":"c0","id":"8ea1cd37-b071-45fe-846b-d046c32216da","name":"Rudder","estimatedTime":5400,"mainTasks":["cut wood","grind raw rudder"],"stepTemplates":[{"title":"Cutting","keyMessage":"be careful with your hands","tasks":"do some cutting....","materials":["wood"],"toolIds":["saw"],"pictureUris":[],"videoUris":[]},{"title":"Grinding","keyMessage":"do it precisely","tasks":"do some grinding...","materials":["raw rudder"],"toolIds":["grinder"],"pictureUris":[],"videoUris":[]}],"previousComments":null}],"processTemplateIds":["d39fc645-e857-4667-8477-78d8f4a2a01f","8ea1cd37-b071-45fe-846b-d046c32216da"]},"templateId":"647e3942-ec1e-4336-ace7-2c447d278aac"}],"status":"in_preparation"}]');
    sessionStorage.setItem('processes', '[]');
  }

  login() {
    sessionStorage.setItem('loggedIn', '1');
  }

  clear() {
    sessionStorage.clear();
  }
}
