mw_validation
=============

Implementation
-------------
### Podstawowy Przykład ###
```html
<!doctype html>
<html>
   <head>
      <script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
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
         <section class="step" data-step="2" style="display:none;">
              Dziękujemy
         </section>
      </form>
   </body>
</html>
```


### Inputs ###
- - -

#### Podstawowy wygląd ####

id - musi być unikalne w bloku form
data-validation = [rodzaj walidacji(string)],[miejsce pojawiania się tolltipa(string)]

```html
<input type="text" id="email" data-validation="email, top" placeholder="Wpisz adres e-mail"/>
```


#### Opcjonalne argumenty ####

Tekst wyświetlany w tooltipie
data-label = [tekst(string)]

```html
<input type="text" id="email" data-validation="email, top"  data-label="Pole nie może być puste" placeholder="Wpisz adres e-mail" />
```
Efekt wyświetlania tooltipa
data-cloud_effect - [efekt(string), szybkość(string)]

```html
<input type="text" id="email" data-validation="email, top"  data-cloud_effect="slideDown, fast" placeholder="Wpisz adres e-mail" />
```
