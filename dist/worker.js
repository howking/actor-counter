/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = async name => {
    if (!registry[name]) {
      
        await new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            
              script.src = name;
            
            // Ya never know
            script.defer = true;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      

      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
    }
    return registry[name];
  };

  const require = async (names, resolve) => {
    const modules = await Promise.all(names.map(singleRequire));
    resolve(modules.length === 1 ? modules[0] : modules);
  };

  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = new Promise(async resolve => {
      let exports = {};
      const module = {
        
          uri: location.origin + moduleName.slice(1)
        
      };
      const deps = await Promise.all(
        depsNames.map(depName => {
          if (depName === "exports") {
            return exports;
          }
          if (depName === "module") {
            return module;
          }
          return singleRequire(depName);
        })
      );
      exports.default = factory(...deps);
      resolve(exports);
    });
  };
}
define("./worker.js",[],function(){"use strict";const e=50,s="ACTOR-DATABASE",t="LIST";class n extends(function(e){return class extends e{constructor(){super(...arguments),this.initPromise=Promise.resolve().then(()=>this.init())}async init(){}onMessage(e){throw new Error(`onMessage not implemented for ${this.actorName}`)}}}(Object)){async init(){}}const r=new class{constructor(e){this.name=e,this.objStoreName=t,this.lastCursorId=0,this.dbName=`${s}.${e}`,this.database=this.init(),"BroadcastChannel"in self&&(this.bcc=new BroadcastChannel(e))}resetCursor(){this.lastCursorId=0}init(){return new Promise((e,s)=>{const t=indexedDB.open(this.dbName);t.onerror=(()=>{s(t.error)}),t.onsuccess=(()=>{e(t.result)}),t.onupgradeneeded=(()=>{t.result.objectStoreNames.contains(this.objStoreName)||t.result.createObjectStore(this.objStoreName,{autoIncrement:!0})})})}async popMessages(e,{keepMessage:s=!1}={}){const t=(await this.database).transaction(this.objStoreName,"readwrite").objectStore(this.objStoreName).openCursor(IDBKeyRange.lowerBound(this.lastCursorId,!0));return new Promise((n,r)=>{const i=[];t.onerror=(()=>{r(t.error)}),t.onsuccess=(()=>{const r=t.result;if(r){const t=r.value;t.recipient!==e&&"*"!==e||(i.push(t),s||r.delete()),r.continue(),this.lastCursorId=r.key}else n(i)})})}async pushMessage(e){if("*"===e.recipient)throw new Error("Can’t send a message to reserved name '*'");const s=(await this.database).transaction(this.objStoreName,"readwrite");return new Promise((t,n)=>{s.onerror=(()=>{n(s.error)}),s.oncomplete=(()=>{this.bcc&&this.bcc.postMessage({recipient:e.recipient}),t()}),s.objectStore(this.objStoreName).add(e)})}subscribeWithBroadcastChannel(e,s){const t=new BroadcastChannel(this.name),n=async t=>{if(t.data.recipient!==e)return;const n=await this.popMessages(e);n.length>0&&s(n)};return t.addEventListener("message",n),n(new MessageEvent("message",{data:{recipient:e}})),()=>{t.close()}}subscribeWithPolling(s,t){let n=-1;const r=async()=>{const i=await this.popMessages(s);i.length>0&&t(i),n=window.setTimeout(r,e)};return n=window.setTimeout(r,e),()=>{self.clearTimeout(n)}}subscribe(e,s){let t=null;return t="BroadcastChannel"in self?this.subscribeWithBroadcastChannel(e,s):this.subscribeWithPolling(e,s)}}("ACTOR-MESSAGES");var i;!function(e){e[e.INCREMENT=0]="INCREMENT",e[e.DECREMENT=1]="DECREMENT"}(i||(i={}));const a={counter:0,clicks:0};!async function(e,s,{purgeExistingMessages:t=!1}={}){s.actorName=e,await s.initPromise,r.resetCursor(),t&&await r.popMessages(e);const n=r.subscribe(e,e=>{for(const t of e)try{s.onMessage(t.detail)}catch(e){console.error(e)}})}("state",new class extends n{constructor(){var e;super(...arguments),this.ui=(e="ui",{async send(s){await r.pushMessage({recipient:e,detail:s})}}),this.state=a}async init(){this.ui.send(this.state)}onMessage(e){switch(e){case i.INCREMENT:this.state.counter+=1;break;case i.DECREMENT:this.state.counter-=1}this.state.clicks+=1,this.ui.send(this.state)}})});
