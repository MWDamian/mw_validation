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

- - -
### input[type='text'] ###
- - -

#### Podstawowy wygląd ####

id - musi być unikalne w bloku form<br/>
data-validation = [rodzaj walidacji(string)],[miejsce pojawiania się tolltipa(string)]<br/>
rodzaj walidacji - email, phone...<br/>
miejsce pojawiania się tolltipa - top, right, bottom, left<br/>

```html
<input type="text" id="email" data-validation="email, top" placeholder="Wpisz adres e-mail"/>
```


#### Opcjonalne argumenty ####

Tekst wyświetlany w tooltipie
data-label = [tekst(string)]
```html
<input type="text" id="email" data-validation="email, top"  data-label="Pole nie może być puste" placeholder="Wpisz adres e-mail" />
```
Efekt wyświetlania tooltipa<br/>
data-cloud_effect - [efekt(string), szybkość(string)]<br/>
efekt - fadeIn, slideDown, show<br/>
szybkość - fast, slow, 500<br/>

```html
<input type="text" id="email" data-validation="email, top"  data-cloud_effect="slideDown, fast" placeholder="Wpisz adres e-mail" />
```
Maskowanie pola
data-mask - [maska(string)]
```html
<input type="text" id="email" data-validation="email, top" data-mask="+48-999-999-999" placeholder="Wpisz adres e-mail" />
```
- - -
### input[type='checkbox'] ###
- - -

#### Podstawowy wygląd ####

id - musi być unikalne w bloku form<br/>
data-validation = [typ pola(string)],czy zapisywać do bazy danych(string)],[miejsce pojawiania się tolltipa(string)]
<br/>
typ pola - optional, required<br/>
szybkość - save, no-save<br/>
miejsce pojawiania się tolltipa - top, right, bottom, left<br/>

```html
<input type="checkbox" id="chb_1" data-validation="optional, save, left"/>
```


- - -
### Wielostepowe formularze ###
- - -
sekcja stepu musi posiadać klasę "step" oraz posiadać atrybut data-step równy numerowi stepu<br/>


```html
<section class="step" data-step="1">
</section>
<section class="step" data-step="2" style="display:none;">
</section>
      
```

- - -
### Kody konwersji ###
- - -

```html
<script>
   google_conversion_id = 978293595;
   google_conversion_label = "KYLmCM2WpQcQ26a-0gM";
   google_conversion_value = 0;
</script>
```
Konwersję można wywołać również za pomocą funkcji:
```html
<script>
    window.count_conversion( google_conversion_id, google_conversion_label, google_conversion_value );
</script>
```

- - -
### Custom emails ###
- - -
Do pliku wskazanego pliku php domyślnie przekazywane jest POSTem zmienna user_email zawierająca w sobie adres e-mail wpsisany wpole email.

```html
user_confirmation_emails = true;
user_confirmation_emails_href = [link do pliku php z obsługą mailingu];
```

- - -
### Steps callbacks ###
- - -
Po każdym stepie wywoływana jest funkcja( jeśli istnieje ) step[numer stepu, który został wykonany]_callback()

```html
<script>
    function step1_callback(){
        przykładowy kod idzie tutaj...
    };
</script>
```

- - -
## Dostępne metody walidacji ##
- - -

notempty: - pole nie może być puste,<br/>
domyślny label : Uzupełnij pole<br/>
<br/>
name - imię - jedno słowo o długości miezy 3-16,<br/>
domyślny label : Podaj poprawne imię<br/>
<br/>
namesurname - imię i nazwisko - dwa słowa o długości miezy 3-16,<br/>
domyślny label : Podaj poprawne imię i nazwisko<br/>
<br/>
email - adres e-mail,<br/>
domyślny label : Podaj poprawny adres email<br/>
<br/>
phone - numer telefonu - numer telefonu 9 liczb,<br/>
domyślny label : Podaj poprawny numer telefonu<br/>
<br/>
