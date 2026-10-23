/* SiNG BOX – Yhteistilan tilaukset + henkilökuntakutsut
 * Lisää nykyisen henkilökuntasivun </body> -tagin edelle:
 * <script src="staff-common.js"></script>
 * Ei korvaa vanhaa huoneiden JavaScriptiä.
 */
(()=>{'use strict';
const KEY='singbox-staff-device-uuid';
const URL='https://tikatiahzawstvrdqfix.supabase.co';
const PUBKEY='sb_publishable_ZfYe1fy7Dxu59HfTLSQ7Cw_EK0xGl34';
const money=n=>new Intl.NumberFormat('fi-FI',{style:'currency',currency:'EUR'}).format(n||0);
const when=stamp=>new Date(stamp).toLocaleString('fi-FI',{day:'numeric',month:'numeric',hour:'2-digit',minute:'2-digit'});
let client,container,feedback,orders,calls,lastLoading=false,latest=[];
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
  const ch=el('h3','sc-heading','Kutsu myyjä');
  calls=el('div','sc-cards');
  container.append(heading,p,b,feedback,oh,orders,ch,calls);
  parent.replaceChildren(container);
  document.querySelectorAll('.staff-view-button').forEach(x=>x.addEventListener('click',()=>setTimeout(()=>load(),250)));
  setInterval(()=>load(),7000);
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
  if(!parent||!container||parent.hidden||lastLoading)return;
  const uuid=localStorage.getItem(KEY);
  if(!uuid){orders.replaceChildren(el('p','sc-quiet','Henkilökuntatablettia ei ole yhdistetty.'));return}
  lastLoading=true;
  try{
    const data=await rpc('staff_common_dashboard',{p_device_uuid:uuid});
    latest=Array.isArray(data?.orders)?data.orders:[];
    showOrders(latest);
    showCalls(Array.isArray(data?.calls)?data.calls:[]);
    if(force)msg('Yhteistilan tiedot päivitetty.');
  }catch(e){showError('Tietojen haku epäonnistui: '+e.message)}
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
  calls.replaceChildren();
  if(!list.length){calls.append(el('p','sc-quiet','Ei avoimia myyjäkutsuja.'));return}
  for(const c of list){
    const card=el('article','sc-card');
    card.append(el('div','sc-main',c.table_name||'Pöytä'),el('p','sc-detail','Kutsu lähetetty '+when(c.created_at)));
    card.append(btn('Kuitattu · hoidettu',()=>action('staff_common_resolve_call',{p_call_id:Number(c.id)},'Myyjäkutsu kuitattu.')));
    calls.append(card)
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
