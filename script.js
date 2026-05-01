// WhatsApp tracking + form handling

document.querySelectorAll('.whatsapp-link').forEach(link=>{
  link.addEventListener('click',()=>{
    console.log('WhatsApp click tracked');
  });
});

const form = document.getElementById('leadForm');
if(form){
  form.addEventListener('submit',function(e){
    e.preventDefault();
    const name = form.name.value;
    const business = form.business.value;
    const need = form.need.value;

    const message = `Bonjour, je m'appelle ${name}. Mon activité est : ${business}. Mon besoin : ${need}`;
    const url = `https://wa.me/221777989238?text=${encodeURIComponent(message)}`;

    window.open(url,'_blank');
  });
}
