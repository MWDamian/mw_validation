mw_validation
=============

Implementation
-------------
### Podstawowy Przykład ###
```html
<!doctype html>
<html>
   <head>
      <script src="http://resources.marketingwizards.pl/validation/1.1.5/walidacja-source.js"></script>
      <script>
         table = 'przykladowa_tabela'; 
      </script>
   </head>
   <body>
      <form id="main_form">
         <section class="step" data-step="1">
             <input type="text" id="email" data-validation="email, top" placeholder="Wpisz adres e-mail"/>
            <input type="button" value="Wyślij &raquo;" />
         </section>
         <section class="step" ata-step="2" style="display:none;">
              Dziękujemy
         </section>
      </form>
   </body>
</html>
```
