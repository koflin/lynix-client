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

    sessionStorage.setItem('productTemplates', '[{"companyId":"c0","id":"83f97fc8-d4af-4010-9ab5-fb12218c1c6e","name":"Keel","processes":[{"template":{"companyId":"c0","id":"1fa9bb95-5f11-4b73-8cdd-741070e6ab26","name":"850","mainTasks":["Grease the keel","Grease all screws","Keel must be centered","Mix ratio 100/26","Wearing safety shoes"],"stepTemplates":[{"title":"Positioning Keel Form","keyMessage":"Be careful: Keel form can fall over!","tasks":"Position keel form under 2t crane in assembly room 1","materials":[],"toolIds":["Keel form"],"pictureUris":[],"videoUris":[],"estimatedTime":900},{"title":"Prepare Keel Form","keyMessage":"Tape must not overlap","tasks":"Tape keel form (Sealing flange)","materials":["1x Tape green 25mm","1x Tape green 15mm"],"toolIds":["1 Cutter"],"pictureUris":[],"videoUris":[],"estimatedTime":1800},{"title":"Apply Seperating Wax","keyMessage":"Wear coal filter mask\\nWear solvent-free gloves\\nLet the air escape for 15 minutes between process step no. 1 and 2","tasks":"Coat keel form 2 times with Frecote 1. 770-NC","materials":["1 Frecote 770-NC","1 Cleaning rag","1 Solvent-free glove"],"toolIds":["1 Coal filter mask"],"pictureUris":[],"videoUris":[],"estimatedTime":1800},{"title":"Get Keel Blank","keyMessage":"Secure the keel with wedge to prevent it from falling down","tasks":"1. Put keel blank under 2t crane (marked area)\\n2. Attach keel blank to crane\\n3. Secure against falling down with two wooden blocks","materials":[],"toolIds":["1 Hand pallet truck","1 Euro pallet","2 Wedge (wooden)","1 Measuring device"],"pictureUris":[],"videoUris":[],"estimatedTime":900},{"title":"Mount Sponges","keyMessage":"Mix ratio must be followed (2% hardener)\\nProcess step must be executed in 5 minutes (cure time)","tasks":"1. Mix the filler\\n2. Apply filler on steel support\\n3. Center sponge in the front and stick to steel\\n4. Center sponge in the back and stick to steel\\n5. Secure both sponges against falling down with tape","materials":["1 Latex glove","1 Tape","1 Polyester filler","2 CNC-produced sponge"],"toolIds":["1 Japanese Scraper","1 Measuring device"],"pictureUris":[],"videoUris":[],"estimatedTime":900},{"title":"Pressing Keel Blank Into Form","keyMessage":"Optional: Place parker screws in the lead seal as a centering aid in the longitudinal axis -  to regulate the height","tasks":"1. Degrease keel with acetone\\n2. Turn 6 centering screws to the right position\\n3. Move left keel form to the blank\\n4. Center the keel into the left keel form (top)\\n5. Move right keel form to blank\\n6. Close keel form","materials":["1 Parker screw (4.2 x 20mm)","1 Acetone"],"toolIds":["1 Drill 3mm","1 Measuring device","1 Phillips screwdriver no. 3","1 Nut 17mm"],"pictureUris":[],"videoUris":[],"estimatedTime":3600},{"title":"Close And Center Keel Form","keyMessage":"Check longitudinal and transverse axis centering\\nKeel and sponge must not touch keel form - minimum distance 5mm","tasks":"1. Close tight the keel form with screw clamps\\n2. Center keel blank with the six center screws","materials":[],"toolIds":["16 Screw clamps"],"pictureUris":[],"videoUris":[],"estimatedTime":900},{"title":"Preparation Of First Keel Filling","keyMessage":"Dimension 50mm must be in accordance with drawing","tasks":"1. Mount storage surface for resin bucket\\n2. Mount the two connecting pieces to the keel form\\n3. Cutting and mounting of hose for the bottom filling\\n4. Final check dimension 50mm - see picture","materials":["2 Hose diameter 30mm"],"toolIds":["1 Cutter","1 Measuring device"],"pictureUris":[],"videoUris":[],"estimatedTime":1800},{"title":"First Filling","keyMessage":"Mixing ratio must be 100/26\\nMixing for 4mins\\nAir for 30 minutes before filling\\nRoom temperature must not be below 20°C","tasks":"1. Mix resin - 7kg Harz GT 713 and 1.82kg hardener\\n2. Air for 30min\\n3. Fill in resin: Resin must exit the air hose - check first filling complete","materials":["1 7kg Resin GT 713","1 1.82kg hardener TH"],"toolIds":["1 Scale","1 Stirrer"],"pictureUris":[],"videoUris":[],"estimatedTime":900},{"title":"Preparation Of Second Keel Filling","keyMessage":null,"tasks":"1. Reposition hose for the top filling\\n2. Remove storage surface from the first filling","materials":["2 Hose diameter 30mm"],"toolIds":["1 Cutter"],"pictureUris":[],"videoUris":[],"estimatedTime":900},{"title":"Second Filling","keyMessage":"Mixing ratio must be 100/26\\nMixing for 4mins\\nAir for 30 minutes before filling\\nRoom temperature must not be below 20°C\\nResin must not boil - potentially in two steps","tasks":"1. Mix resin 15kg resin GT 713 and 3.9kg hardener\\n2. Air for 30min\\n3. Fill in resin\\n4. Rest for 24h","materials":["1 15kg resin GT 713","1 3.9kg hardener TH"],"toolIds":["1 Scale","1 Stirrer"],"pictureUris":[],"videoUris":[],"estimatedTime":900},{"title":"Tempering Keel","keyMessage":"Temperature must not be below 60°C and not above 80°C\\nTempering time of 9h must be respected","tasks":"1. Set up oven\\n2. Heat at 60°C - 9h\\n3. Rest - 5h","materials":[],"toolIds":["1 Heater","1 Oven element","1 Thermometer"],"pictureUris":[],"videoUris":[],"estimatedTime":1800},{"title":"Disassamble Oven","keyMessage":null,"tasks":"Disassamble oven","materials":[],"toolIds":[],"pictureUris":[],"videoUris":[],"estimatedTime":1800},{"title":"Mold Keel","keyMessage":"Loosen center screws prior to opening the form (Danger of breaking the screw)","tasks":"1. Remove hose\\n2. Drill out filling channels 15mm\\n3. Remove screw clamps\\n4. Tighten the center screw\\n5. Loosen the center screw\\n6. Open keel form with wooden wedge","materials":[],"toolIds":["1 Drill 15mm","1 Wedge (wooden)"],"pictureUris":[],"videoUris":[],"estimatedTime":900}],"previousComments":null},"quantity":1,"templateId":"1fa9bb95-5f11-4b73-8cdd-741070e6ab26"}]},{"companyId":"c0","id":"647e3942-ec1e-4336-ace7-2c447d278aac","name":"Boat 3000","processes":[{"template":{"companyId":"c0","id":"d39fc645-e857-4667-8477-78d8f4a2a01f","name":"Sail","estimatedTime":9000,"mainTasks":["cut cloth","sew sail"],"stepTemplates":[{"title":"Cutting","keyMessage":"be careful with your hands!","tasks":"do some cutting","materials":["cloth"],"toolIds":["scissor"],"pictureUris":["https://ullmansails.com/wp-content/uploads/2016/03/Ullman-Sails-Design-Image-Four-V2.jpg"],"videoUris":[]},{"title":"Sewing","keyMessage":"do it precisely!","tasks":"Do some sewing....","materials":["cloth","string"],"toolIds":["scissor","sewing machine"],"pictureUris":["https://ullmansails.com/wp-content/uploads/2016/03/Ullman-Sails-Design-Image-Four-V2.jpg"],"videoUris":[]}],"previousComments":null},"templateId":"d39fc645-e857-4667-8477-78d8f4a2a01f","quantity":2},{"templateId":"8ea1cd37-b071-45fe-846b-d046c32216da","quantity":1,"template":{"companyId":"c0","id":"8ea1cd37-b071-45fe-846b-d046c32216da","name":"Rudder","estimatedTime":5400,"mainTasks":["cut wood","grind raw rudder"],"stepTemplates":[{"title":"Cutting","keyMessage":"be careful with your hands","tasks":"do some cutting....","materials":["wood"],"toolIds":["saw"],"pictureUris":[],"videoUris":[]},{"title":"Grinding","keyMessage":"do it precisely","tasks":"do some grinding...","materials":["raw rudder"],"toolIds":["grinder"],"pictureUris":[],"videoUris":[]}],"previousComments":null}}]},{"companyId":"c0","id":"4c977342-caaa-4526-9d0a-ecfd61565e71","name":"Unnamed Product 2","processes":[]}]');
    sessionStorage.setItem('processTemplates', '[{"companyId":"c0","id":"1fa9bb95-5f11-4b73-8cdd-741070e6ab26","name":"850","mainTasks":["Grease the keel","Grease all screws","Keel must be centered","Mix ratio 100/26","Wearing safety shoes"],"stepTemplates":[{"title":"Positioning Keel Form","keyMessage":"Be careful: Keel form can fall over!","tasks":"Position keel form under 2t crane in assembly room 1","materials":[],"toolIds":["Keel form"],"pictureUris":[],"videoUris":[],"estimatedTime":900},{"title":"Prepare Keel Form","keyMessage":"Tape must not overlap","tasks":"Tape keel form (Sealing flange)","materials":["1x Tape green 25mm","1x Tape green 15mm"],"toolIds":["1 Cutter"],"pictureUris":[],"videoUris":[],"estimatedTime":1800},{"title":"Apply Seperating Wax","keyMessage":"Wear coal filter mask\\nWear solvent-free gloves\\nLet the air escape for 15 minutes between process step no. 1 and 2","tasks":"Coat keel form 2 times with Frecote 1. 770-NC","materials":["1 Frecote 770-NC","1 Cleaning rag","1 Solvent-free glove"],"toolIds":["1 Coal filter mask"],"pictureUris":[],"videoUris":[],"estimatedTime":1800},{"title":"Get Keel Blank","keyMessage":"Secure the keel with wedge to prevent it from falling down","tasks":"1. Put keel blank under 2t crane (marked area)\\n2. Attach keel blank to crane\\n3. Secure against falling down with two wooden blocks","materials":[],"toolIds":["1 Hand pallet truck","1 Euro pallet","2 Wedge (wooden)","1 Measuring device"],"pictureUris":[],"videoUris":[],"estimatedTime":900},{"title":"Mount Sponges","keyMessage":"Mix ratio must be followed (2% hardener)\\nProcess step must be executed in 5 minutes (cure time)","tasks":"1. Mix the filler\\n2. Apply filler on steel support\\n3. Center sponge in the front and stick to steel\\n4. Center sponge in the back and stick to steel\\n5. Secure both sponges against falling down with tape","materials":["1 Latex glove","1 Tape","1 Polyester filler","2 CNC-produced sponge"],"toolIds":["1 Japanese Scraper","1 Measuring device"],"pictureUris":[],"videoUris":[],"estimatedTime":900},{"title":"Pressing Keel Blank Into Form","keyMessage":"Optional: Place parker screws in the lead seal as a centering aid in the longitudinal axis -  to regulate the height","tasks":"1. Degrease keel with acetone\\n2. Turn 6 centering screws to the right position\\n3. Move left keel form to the blank\\n4. Center the keel into the left keel form (top)\\n5. Move right keel form to blank\\n6. Close keel form","materials":["1 Parker screw (4.2 x 20mm)","1 Acetone"],"toolIds":["1 Drill 3mm","1 Measuring device","1 Phillips screwdriver no. 3","1 Nut 17mm"],"pictureUris":[],"videoUris":[],"estimatedTime":3600},{"title":"Close And Center Keel Form","keyMessage":"Check longitudinal and transverse axis centering\\nKeel and sponge must not touch keel form - minimum distance 5mm","tasks":"1. Close tight the keel form with screw clamps\\n2. Center keel blank with the six center screws","materials":[],"toolIds":["16 Screw clamps"],"pictureUris":[],"videoUris":[],"estimatedTime":900},{"title":"Preparation Of First Keel Filling","keyMessage":"Dimension 50mm must be in accordance with drawing","tasks":"1. Mount storage surface for resin bucket\\n2. Mount the two connecting pieces to the keel form\\n3. Cutting and mounting of hose for the bottom filling\\n4. Final check dimension 50mm - see picture","materials":["2 Hose diameter 30mm"],"toolIds":["1 Cutter","1 Measuring device"],"pictureUris":[],"videoUris":[],"estimatedTime":1800},{"title":"First Filling","keyMessage":"Mixing ratio must be 100/26\\nMixing for 4mins\\nAir for 30 minutes before filling\\nRoom temperature must not be below 20°C","tasks":"1. Mix resin - 7kg Harz GT 713 and 1.82kg hardener\\n2. Air for 30min\\n3. Fill in resin: Resin must exit the air hose - check first filling complete","materials":["1 7kg Resin GT 713","1 1.82kg hardener TH"],"toolIds":["1 Scale","1 Stirrer"],"pictureUris":[],"videoUris":[],"estimatedTime":900},{"title":"Preparation Of Second Keel Filling","keyMessage":null,"tasks":"1. Reposition hose for the top filling\\n2. Remove storage surface from the first filling","materials":["2 Hose diameter 30mm"],"toolIds":["1 Cutter"],"pictureUris":[],"videoUris":[],"estimatedTime":900},{"title":"Second Filling","keyMessage":"Mixing ratio must be 100/26\\nMixing for 4mins\\nAir for 30 minutes before filling\\nRoom temperature must not be below 20°C\\nResin must not boil - potentially in two steps","tasks":"1. Mix resin 15kg resin GT 713 and 3.9kg hardener\\n2. Air for 30min\\n3. Fill in resin\\n4. Rest for 24h","materials":["1 15kg resin GT 713","1 3.9kg hardener TH"],"toolIds":["1 Scale","1 Stirrer"],"pictureUris":[],"videoUris":[],"estimatedTime":900},{"title":"Tempering Keel","keyMessage":"Temperature must not be below 60°C and not above 80°C\\nTempering time of 9h must be respected","tasks":"1. Set up oven\\n2. Heat at 60°C - 9h\\n3. Rest - 5h","materials":[],"toolIds":["1 Heater","1 Oven element","1 Thermometer"],"pictureUris":[],"videoUris":[],"estimatedTime":1800},{"title":"Disassamble Oven","keyMessage":null,"tasks":"Disassamble oven","materials":[],"toolIds":[],"pictureUris":[],"videoUris":[],"estimatedTime":1800},{"title":"Mold Keel","keyMessage":"Loosen center screws prior to opening the form (Danger of breaking the screw)","tasks":"1. Remove hose\\n2. Drill out filling channels 15mm\\n3. Remove screw clamps\\n4. Tighten the center screw\\n5. Loosen the center screw\\n6. Open keel form with wooden wedge","materials":[],"toolIds":["1 Drill 15mm","1 Wedge (wooden)"],"pictureUris":[],"videoUris":[],"estimatedTime":900}],"previousComments":null},{"companyId":"c0","id":"d39fc645-e857-4667-8477-78d8f4a2a01f","name":"Sail","estimatedTime":9000,"mainTasks":["cut cloth","sew sail"],"stepTemplates":[{"title":"Cutting","keyMessage":"be careful with your hands!","tasks":"do some cutting","materials":["cloth"],"toolIds":["scissor"],"pictureUris":["https://ullmansails.com/wp-content/uploads/2016/03/Ullman-Sails-Design-Image-Four-V2.jpg"],"videoUris":[]},{"title":"Sewing","keyMessage":"do it precisely!","tasks":"Do some sewing....","materials":["cloth","string"],"toolIds":["scissor","sewing machine"],"pictureUris":["https://ullmansails.com/wp-content/uploads/2016/03/Ullman-Sails-Design-Image-Four-V2.jpg"],"videoUris":[]}],"previousComments":null},{"companyId":"c0","id":"8ea1cd37-b071-45fe-846b-d046c32216da","name":"Rudder","estimatedTime":5400,"mainTasks":["cut wood","grind raw rudder"],"stepTemplates":[{"title":"Cutting","keyMessage":"be careful with your hands","tasks":"do some cutting....","materials":["wood"],"toolIds":["saw"],"pictureUris":[],"videoUris":[]},{"title":"Grinding","keyMessage":"do it precisely","tasks":"do some grinding...","materials":["raw rudder"],"toolIds":["grinder"],"pictureUris":[],"videoUris":[]}],"previousComments":null}]');
    sessionStorage.setItem('orders', '[{"companyId":"c0","id":"ac0bb8af-3b17-4fba-90e3-868c25be82c9","name":"1000","description":"Keel production","products":[{"quantity":1,"template":{"companyId":"c0","id":"83f97fc8-d4af-4010-9ab5-fb12218c1c6e","name":"Keel","processes":[{"template":{"companyId":"c0","id":"1fa9bb95-5f11-4b73-8cdd-741070e6ab26","name":"850","mainTasks":["Grease the keel","Grease all screws","Keel must be centered","Mix ratio 100/26","Wearing safety shoes"],"stepTemplates":[{"title":"Positioning Keel Form","keyMessage":"Be careful: Keel form can fall over!","tasks":"Position keel form under 2t crane in assembly room 1","materials":[],"toolIds":["Keel form"],"pictureUris":[],"videoUris":[],"estimatedTime":900},{"title":"Prepare Keel Form","keyMessage":"Tape must not overlap","tasks":"Tape keel form (Sealing flange)","materials":["1x Tape green 25mm","1x Tape green 15mm"],"toolIds":["1 Cutter"],"pictureUris":[],"videoUris":[],"estimatedTime":1800},{"title":"Apply Seperating Wax","keyMessage":"Wear coal filter mask\\nWear solvent-free gloves\\nLet the air escape for 15 minutes between process step no. 1 and 2","tasks":"Coat keel form 2 times with Frecote 1. 770-NC","materials":["1 Frecote 770-NC","1 Cleaning rag","1 Solvent-free glove"],"toolIds":["1 Coal filter mask"],"pictureUris":[],"videoUris":[],"estimatedTime":1800},{"title":"Get Keel Blank","keyMessage":"Secure the keel with wedge to prevent it from falling down","tasks":"1. Put keel blank under 2t crane (marked area)\\n2. Attach keel blank to crane\\n3. Secure against falling down with two wooden blocks","materials":[],"toolIds":["1 Hand pallet truck","1 Euro pallet","2 Wedge (wooden)","1 Measuring device"],"pictureUris":[],"videoUris":[],"estimatedTime":900},{"title":"Mount Sponges","keyMessage":"Mix ratio must be followed (2% hardener)\\nProcess step must be executed in 5 minutes (cure time)","tasks":"1. Mix the filler\\n2. Apply filler on steel support\\n3. Center sponge in the front and stick to steel\\n4. Center sponge in the back and stick to steel\\n5. Secure both sponges against falling down with tape","materials":["1 Latex glove","1 Tape","1 Polyester filler","2 CNC-produced sponge"],"toolIds":["1 Japanese Scraper","1 Measuring device"],"pictureUris":[],"videoUris":[],"estimatedTime":900},{"title":"Pressing Keel Blank Into Form","keyMessage":"Optional: Place parker screws in the lead seal as a centering aid in the longitudinal axis -  to regulate the height","tasks":"1. Degrease keel with acetone\\n2. Turn 6 centering screws to the right position\\n3. Move left keel form to the blank\\n4. Center the keel into the left keel form (top)\\n5. Move right keel form to blank\\n6. Close keel form","materials":["1 Parker screw (4.2 x 20mm)","1 Acetone"],"toolIds":["1 Drill 3mm","1 Measuring device","1 Phillips screwdriver no. 3","1 Nut 17mm"],"pictureUris":[],"videoUris":[],"estimatedTime":3600},{"title":"Close And Center Keel Form","keyMessage":"Check longitudinal and transverse axis centering\\nKeel and sponge must not touch keel form - minimum distance 5mm","tasks":"1. Close tight the keel form with screw clamps\\n2. Center keel blank with the six center screws","materials":[],"toolIds":["16 Screw clamps"],"pictureUris":[],"videoUris":[],"estimatedTime":900},{"title":"Preparation Of First Keel Filling","keyMessage":"Dimension 50mm must be in accordance with drawing","tasks":"1. Mount storage surface for resin bucket\\n2. Mount the two connecting pieces to the keel form\\n3. Cutting and mounting of hose for the bottom filling\\n4. Final check dimension 50mm - see picture","materials":["2 Hose diameter 30mm"],"toolIds":["1 Cutter","1 Measuring device"],"pictureUris":[],"videoUris":[],"estimatedTime":1800},{"title":"First Filling","keyMessage":"Mixing ratio must be 100/26\\nMixing for 4mins\\nAir for 30 minutes before filling\\nRoom temperature must not be below 20°C","tasks":"1. Mix resin - 7kg Harz GT 713 and 1.82kg hardener\\n2. Air for 30min\\n3. Fill in resin: Resin must exit the air hose - check first filling complete","materials":["1 7kg Resin GT 713","1 1.82kg hardener TH"],"toolIds":["1 Scale","1 Stirrer"],"pictureUris":[],"videoUris":[],"estimatedTime":900},{"title":"Preparation Of Second Keel Filling","keyMessage":null,"tasks":"1. Reposition hose for the top filling\\n2. Remove storage surface from the first filling","materials":["2 Hose diameter 30mm"],"toolIds":["1 Cutter"],"pictureUris":[],"videoUris":[],"estimatedTime":900},{"title":"Second Filling","keyMessage":"Mixing ratio must be 100/26\\nMixing for 4mins\\nAir for 30 minutes before filling\\nRoom temperature must not be below 20°C\\nResin must not boil - potentially in two steps","tasks":"1. Mix resin 15kg resin GT 713 and 3.9kg hardener\\n2. Air for 30min\\n3. Fill in resin\\n4. Rest for 24h","materials":["1 15kg resin GT 713","1 3.9kg hardener TH"],"toolIds":["1 Scale","1 Stirrer"],"pictureUris":[],"videoUris":[],"estimatedTime":900},{"title":"Tempering Keel","keyMessage":"Temperature must not be below 60°C and not above 80°C\\nTempering time of 9h must be respected","tasks":"1. Set up oven\\n2. Heat at 60°C - 9h\\n3. Rest - 5h","materials":[],"toolIds":["1 Heater","1 Oven element","1 Thermometer"],"pictureUris":[],"videoUris":[],"estimatedTime":1800},{"title":"Disassamble Oven","keyMessage":null,"tasks":"Disassamble oven","materials":[],"toolIds":[],"pictureUris":[],"videoUris":[],"estimatedTime":1800},{"title":"Mold Keel","keyMessage":"Loosen center screws prior to opening the form (Danger of breaking the screw)","tasks":"1. Remove hose\\n2. Drill out filling channels 15mm\\n3. Remove screw clamps\\n4. Tighten the center screw\\n5. Loosen the center screw\\n6. Open keel form with wooden wedge","materials":[],"toolIds":["1 Drill 15mm","1 Wedge (wooden)"],"pictureUris":[],"videoUris":[],"estimatedTime":900}],"previousComments":null},"quantity":1,"templateId":"1fa9bb95-5f11-4b73-8cdd-741070e6ab26"}]},"templateId":"83f97fc8-d4af-4010-9ab5-fb12218c1c6e"}],"status":"in_preparation"},{"companyId":"c0","id":"3471b21d-793e-408f-8078-708f82c39e9a","name":"Showcase Order","description":"Fully populated showcas order","products":[{"quantity":3,"template":{"companyId":"c0","id":"647e3942-ec1e-4336-ace7-2c447d278aac","name":"Boat 3000","processTemplates":[{"companyId":"c0","id":"d39fc645-e857-4667-8477-78d8f4a2a01f","name":"Sail","estimatedTime":9000,"mainTasks":["cut cloth","sew sail"],"stepTemplates":[{"title":"Cutting","keyMessage":"be careful with your hands!","tasks":"do some cutting","materials":["cloth"],"toolIds":["scissor"],"pictureUris":["https://ullmansails.com/wp-content/uploads/2016/03/Ullman-Sails-Design-Image-Four-V2.jpg"],"videoUris":[]},{"title":"Sewing","keyMessage":"do it precisely!","tasks":"Do some sewing....","materials":["cloth","string"],"toolIds":["scissor","sewing machine"],"pictureUris":["https://ullmansails.com/wp-content/uploads/2016/03/Ullman-Sails-Design-Image-Four-V2.jpg"],"videoUris":[]}],"previousComments":null},{"companyId":"c0","id":"8ea1cd37-b071-45fe-846b-d046c32216da","name":"Rudder","estimatedTime":5400,"mainTasks":["cut wood","grind raw rudder"],"stepTemplates":[{"title":"Cutting","keyMessage":"be careful with your hands","tasks":"do some cutting....","materials":["wood"],"toolIds":["saw"],"pictureUris":[],"videoUris":[]},{"title":"Grinding","keyMessage":"do it precisely","tasks":"do some grinding...","materials":["raw rudder"],"toolIds":["grinder"],"pictureUris":[],"videoUris":[]}],"previousComments":null}],"processTemplateIds":["d39fc645-e857-4667-8477-78d8f4a2a01f","8ea1cd37-b071-45fe-846b-d046c32216da"]},"templateId":"647e3942-ec1e-4336-ace7-2c447d278aac"}],"status":"in_preparation"}]');
    sessionStorage.setItem('processes', '[]');
  }

  login() {
    sessionStorage.setItem('loggedIn', '1');
  }

  clear() {
    sessionStorage.clear();
  }
}
