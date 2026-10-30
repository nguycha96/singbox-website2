/* SiNG BOX – Yhteistilan tilaukset + henkilökuntakutsut
 * Lisää nykyisen henkilökuntasivun </body> -tagin edelle:
 * <script src="staff-common.js"></script>
 * Ei korvaa vanhaa huoneiden JavaScriptiä.
 */
(()=>{'use strict';
      const staffConfirmModal = document.getElementById("staffConfirmModal");
const staffConfirmMessage = document.getElementById("staffConfirmMessage");
const staffConfirmOk = document.getElementById("staffConfirmOk");
const staffConfirmCancel = document.getElementById("staffConfirmCancel");

function openStaffConfirm(message, confirmLabel = "OK") {
    return new Promise((resolve) => {
        staffConfirmMessage.textContent = message;
        staffConfirmOk.textContent = confirmLabel;

        staffConfirmModal.hidden = false;
        document.body.classList.add("staff-modal-open");

        const close = (result) => {
            staffConfirmModal.hidden = true;
            document.body.classList.remove("staff-modal-open");

            staffConfirmOk.removeEventListener("click", onOk);
            staffConfirmCancel.removeEventListener("click", onCancel);
            staffConfirmModal.removeEventListener("click", onOverlay);
            document.removeEventListener("keydown", onKeyDown);

            resolve(result);
        };

        const onOk = () => close(true);
        const onCancel = () => close(false);

        const onOverlay = (event) => {
            if (event.target === staffConfirmModal) {
                close(false);
            }
        };

        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                close(false);
            }
        };

        staffConfirmOk.addEventListener("click", onOk);
        staffConfirmCancel.addEventListener("click", onCancel);
        staffConfirmModal.addEventListener("click", onOverlay);
        document.addEventListener("keydown", onKeyDown);
    });
}
const KEY='singbox-staff-device-uuid';
const URL='https://tikatiahzawstvrdqfix.supabase.co';
const PUBKEY='sb_publishable_ZfYe1fy7Dxu59HfTLSQ7Cw_EK0xGl34';
const money=n=>new Intl.NumberFormat('fi-FI',{style:'currency',currency:'EUR'}).format(n||0);
const when=stamp=>new Date(stamp).toLocaleString('fi-FI',{day:'numeric',month:'numeric',hour:'2-digit',minute:'2-digit'});
let client,container,feedback,orders,globalCalls,lastLoading=false,latest=[];
function el(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=String(text);return e}
function btn(text,fn){const e=el('button','sc-btn',text);e.type='button';e.addEventListener('click',async()=>{e.disabled=true;try{await fn()}catch(err){showError(err?.message||'Toiminto epäonnistui')}finally{e.disabled=false}});return e}
function msg(text){if(feedback){feedback.textContent=text;feedback.hidden=false}}
function showError(text){msg('Virhe: '+text)}
const css=`
#singboxCommon{font-family:inherit;color:#f4eddc;padding:12px 0 32px}
#singboxCommon .sc-heading{color:#f0dcb5;font-weight:600;font-size:22px;margin:8px 0 12px}
#singboxCommon .sc-quiet{color:#bbc8c0;font-size:14px;margin:4px 0 15px}
#singboxCommon .sc-cards{display:grid;gap:12px;margin:10px 0 22px}
#singboxCommon .sc-card{background:#09271e;border:1px solid #967a43;border-radius:15px;padding:16px}
#singboxCommon .sc-top{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:8px}
#singboxCommon .sc-main{font-size:18px;color:#f0dcb5;font-weight:600}
#singboxCommon .sc-status{font-size:13px;color:#d7a846}
#singboxCommon .sc-row{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;border-top:1px solid #536852;padding:12px 0}
#singboxCommon .sc-row div:first-child{flex:1;min-width:150px}
#singboxCommon .sc-detail{color:#bbc8c0;font-size:13px}
#singboxCommon .sc-actions{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 0}
#singboxCommon .sc-btn{padding:10px 14px;border-radius:10px;background:#183f32;color:#f0dcb5;border:1px solid #967a43;min-height:44px;font:inherit;font-size:14px;font-weight:600;cursor:pointer}
#singboxCommon .sc-btn:disabled{opacity:.4;cursor:default}
#singboxCommon .sc-btn.sc-paid{background:#ff2f92;border-color:#ff2f92;color:#fff}
#singboxCommon .sc-alert{padding:12px;border-radius:10px;background:#223c2b;border:1px solid #d7a846;margin:12px 0}
/* Näkyy sekä Huoneet- että Yhteistila-näkymässä. */
#singboxCommonCallPanel[hidden]{display:none!important}
#singboxCommonCallPanel{padding:0;margin:15px 0 20px;color:#f0dcb5;font-family:inherit}
#singboxCommonCallPanel .sc-call-heading{font-size:18px;font-weight:700;color:#f0dcb5;margin:0 0 12px}
#singboxCommonCallPanel .sc-global-card{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;padding:16px;margin:10px 0;background:#163628;border:2px solid #d7a846;border-left:5px solid #ff2f92;border-radius:12px}
#singboxCommonCallPanel .sc-global-label{display:block;color:#d7a846;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:3px}
#singboxCommonCallPanel .sc-global-name{color:#f0dcb5;font-size:21px;font-weight:700}
#singboxCommonCallPanel .sc-global-time{font-size:13px;color:#d3ded7;margin-top:4px}
#singboxCommonCallPanel .sc-global-btn{min-height:44px;padding:11px 16px;border-radius:10px;border:1px solid #d7a846;background:#0d4a35;color:#fff;font:inherit;font-weight:700;cursor:pointer}
#singboxCommonCallPanel .sc-global-btn:disabled{opacity:.55;cursor:wait}
#singboxCommonCallPanel .sc-global-error{background:#34281f;border:1px solid #d7a846;border-radius:10px;padding:14px;color:#f0dcb5}
#singboxCommonCallPanel .sc-global-card{padding:14px 16px;gap:14px}
#singboxCommonCallPanel .sc-global-name{font-family:inherit;font-size:21px;line-height:1.2}
#singboxCommonCallPanel .sc-global-time{font-family:inherit;font-size:13px;line-height:1.35}
#singboxCommonCallPanel .sc-global-btn{font-family:inherit;font-size:14px;line-height:1.3;padding:11px 16px;min-height:44px}
/* Huoneiden ja yhteistilan kutsuille sama tiivis korttikoko ja fontit.
   Olemassa olevia pinkkejä/kultaisia värejä ei muuteta. */
#serviceCallPanel{
 box-sizing:border-box!important;
 width:100%!important;
 max-width:none!important;
 padding:0!important;
 margin:15px 0 20px!important;
}
#serviceCallPanel .service-call-card{
 box-sizing:border-box!important;
 width:100%!important;
 max-width:none!important;
 min-height:0!important;
 height:auto!important;
 display:flex!important;
 flex-wrap:wrap!important;
 justify-content:space-between!important;
 align-items:center!important;
 gap:14px!important;
 padding:14px 16px!important;
 margin:10px 0!important;
 border-radius:12px!important;
}
#serviceCallPanel .service-call-info{
 flex:1 1 180px!important;
 min-width:0!important;
 display:flex!important;
 flex-direction:column!important;
 align-items:flex-start!important;
 gap:3px!important;
 padding:0!important;
 margin:0!important;
}
#serviceCallPanel .service-call-label{
 font-family:inherit!important;
 font-size:12px!important;
 font-weight:700!important;
 letter-spacing:.1em!important;
 line-height:1.35!important;
 margin:0!important;
 padding:0!important;
}
#serviceCallPanel .service-call-title{
 font-family:inherit!important;
 font-size:21px!important;
 font-weight:700!important;
 line-height:1.2!important;
 margin:0!important;
 padding:0!important;
}
#serviceCallPanel .service-call-time{
 display:block!important;
 font-family:inherit!important;
 font-size:13px!important;
 font-weight:400!important;
 line-height:1.35!important;
 margin:0!important;
 padding:0!important;
}
#serviceCallPanel .resolve-service-call{
 box-sizing:border-box!important;
 flex:0 0 auto!important;
 font-family:inherit!important;
 font-size:14px!important;
 font-weight:700!important;
 line-height:1.3!important;
 min-height:44px!important;
 height:auto!important;
 width:auto!important;
 max-width:100%!important;
 padding:11px 16px!important;
 margin:0!important;
 border-radius:10px!important;
}
@media (max-width:520px){
 #serviceCallPanel .resolve-service-call,
 #singboxCommonCallPanel .sc-global-btn{width:100%!important}
}
`;
function init(){
  const parent=document.getElementById('commonView');
  if(!parent||!window.supabase?.createClient){console.warn('SiNG BOX common: commonView tai Supabase puuttuu');return}
  client=window.supabase.createClient(URL,PUBKEY,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
  const style=el('style');style.textContent=css;document.head.append(style);
  container=el('section');container.id='singboxCommon';
  const heading=el('h2','sc-heading','Yhteistilan tilaukset');
  feedback=el('div','sc-alert');feedback.hidden=true;
  const p=el('p','sc-quiet','Tämä näkymä päivittyy automaattisesti. Tilaukset maksetaan toistaiseksi lopussa.');
  const b=btn('Päivitä nyt',()=>load(true));
  const oh=el('h3','sc-heading','Avoimet tilaukset');
  orders=el('div','sc-cards');
  // Tilauskortit pysyvät Yhteistila-välilehdellä.
  container.append(heading,p,b,feedback,oh,orders);
  parent.replaceChildren(container);

  // Myyjäkutsut näytetään aina sivun yläosassa, näkymästä riippumatta.
  globalCalls=el('section');
  globalCalls.id='singboxCommonCallPanel';
  globalCalls.setAttribute('aria-label','Yhteistilan myyjäkutsut');
  globalCalls.setAttribute('aria-live','polite');
  globalCalls.hidden=true;
  const intro=document.querySelector('.staff-intro');
  const app=document.getElementById('staffApp');
  if(intro)intro.insertAdjacentElement('afterend',globalCalls);
  else if(app)app.prepend(globalCalls);
  else document.body.prepend(globalCalls);

  document.querySelectorAll('.staff-view-button').forEach(x=>x.addEventListener('click',()=>setTimeout(()=>load(),250)));
  // Hae kutsut aina myös Huoneet-näkymässä.
  setInterval(()=>load(),7000);
  window.addEventListener('focus',()=>load());
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)load()});
  setTimeout(()=>load(),700);
}
async function rpc(name,params){const {data,error}=await client.rpc(name,params);if(error)throw Error(error.message);return data}
async function action(name,params,ok){
  const uuid=localStorage.getItem(KEY);
  if(!uuid){showError('Yhdistä ensin henkilökuntatabletti');return}
  await rpc(name,{p_device_uuid:uuid,...params});msg(ok);await load(true)
}
async function load(force=false){
  const parent=document.getElementById('commonView');
  if(!parent||!container||!globalCalls||lastLoading)return;
  const uuid=localStorage.getItem(KEY);
  if(!uuid){
    globalCalls.hidden=true;
    if(!parent.hidden)orders.replaceChildren(el('p','sc-quiet','Henkilökuntatablettia ei ole yhdistetty.'));
    return;
  }
  lastLoading=true;
  try{
    const data=await rpc('staff_common_dashboard',{p_device_uuid:uuid});
    latest=Array.isArray(data?.orders)?data.orders:[];
    // Kutsut käsitellään riippumatta siitä, kumpi välilehti on auki.
    showCalls(Array.isArray(data?.calls)?data.calls:[]);
    if(!parent.hidden){
      showOrders(latest);
      if(force)msg('Yhteistilan tiedot päivitetty.');
    }
  }catch(e){
    console.error('Yhteistilan ilmoitusten haku epäonnistui:',e);
    if(!parent.hidden)showError('Tietojen haku epäonnistui: '+e.message);
    globalCalls.hidden=false;
    globalCalls.replaceChildren(el('div','sc-global-error','Yhteistilan kutsujen päivitys epäonnistui. Tarkista yhteys.'));
  }
  finally{lastLoading=false}
}
function showOrders(list){
  orders.replaceChildren();
  if(!list.length){orders.append(el('p','sc-quiet','Ei avoimia yhteistilan tilauksia.'));return}
  for(const o of list){
    const card=el('article','sc-card');
    const top=el('div','sc-top');
    top.append(el('strong','sc-main',(o.table_name||'Pöytä')+' · Tilaus #'+o.id),el('span','sc-status',when(o.created_at)+' · '+(o.payment_status==='unpaid'?'Maksamatta':o.payment_status)));
    card.append(top);
    let complete=true,deliveredSomething=false,total=0;
    for(const i of o.items||[]){
      const row=el('div','sc-row');
      const quantity=Number(i.quantity)||0,del=Number(i.delivered)||0,can=Number(i.cancelled)||0;
      const remaining=Math.max(0,quantity-del-can);
      if(remaining>0)complete=false;
      if(del>0)deliveredSomething=true;
      total+=Math.max(0,quantity-can)*Number(i.price||0);
      const info=el('div');info.append(el('div','',i.name||'Tuote'),el('div','sc-detail',`Tilattu ${quantity} · Toimitettu ${del} · Peruutettu ${can} · ${money(i.price)} / kpl`));
      const actions=el('div','sc-actions');
      if(remaining){
        actions.append(btn('Toimita 1',()=>action('staff_common_update_item',{p_item_id:Number(i.id),p_action:'deliver',p_quantity:1},'Tuote toimitettu.')));
        actions.append(btn('Peruuta 1',()=>{
          if(!confirm('Peruutetaanko yksi kappale?'))return;
          return action('staff_common_update_item',{p_item_id:Number(i.id),p_action:'cancel',p_quantity:1},'Tuote peruutettu.');
        }));
      }else actions.append(el('span','sc-detail','Käsitelty'));
      row.append(info,actions);card.append(row);
    }
    const foot=el('div','sc-top');foot.append(el('strong','sc-main','Maksettavaa '+money(total)));
    const bottom=el('div','sc-actions');
    const pay=btn('Vahvista maksu lopussa',()=>{
      if(!confirm('Onko asiakas maksanut tämän tilauksen?'))return;
      return action('staff_common_mark_paid',{p_order_id:Number(o.id)},'Maksu vahvistettu.');
    });pay.classList.add('sc-paid');pay.disabled=!complete||!deliveredSomething;
    bottom.append(pay);
    if(!complete)bottom.append(el('span','sc-detail','Toimita tai peruuta kaikki tuotteet ennen maksun vahvistamista.'));
    if(complete&&!deliveredSomething)bottom.append(el('span','sc-detail','Kaikki tuotteet on peruutettu: maksua ei voi vahvistaa.'));
    card.append(foot,bottom);orders.append(card)
  }
}
function showCalls(list){
  if(!globalCalls)return;
  globalCalls.replaceChildren();
  if(!list.length){
    globalCalls.hidden=true;
    return;
  }
  globalCalls.hidden=false;
  globalCalls.append(el('h2','sc-call-heading',
    list.length===1?'Yhteistilan henkilökuntakutsu':'Yhteistilan henkilökuntakutsut ('+list.length+')'));
  for(const c of list){
    const card=el('article','sc-global-card');
    const info=el('div');
    info.append(el('span','sc-global-label','KUTSU MYYJÄ · YHTEISTILA'));
    info.append(el('strong','sc-global-name',c.table_name||'Pöytä'));
    info.append(el('div','sc-global-time','Kutsuttu '+when(c.created_at)));
    const button=el('button','sc-global-btn','Kuittaa hoidetuksi');
    button.type='button';
    button.addEventListener('click',async()=>{
      button.disabled=true;
      button.textContent='Kuitataan...';
      try{
        await action('staff_common_resolve_call',{p_call_id:Number(c.id)},'Myyjäkutsu kuitattu.');
      }catch(err){
        console.error('Myyjäkutsun kuittaus epäonnistui:',err);
        button.disabled=false;
        button.textContent='Yritä uudelleen';
      }
    });
    card.append(info,button);
    globalCalls.append(card);
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
