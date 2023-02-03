# PHP

:::danger
Currently, there is no formal CASS library for PHP. If you would like to contribute or begin developing one, see the contributor section of this guide. We welcome contributions in the form of PHP libraries. **If this is something you would like to pursue, please get in touch with the lead developer: [fritz.ray@eduworks.com](mailto:fritz.ray@eduworks.com)**
:::

## Javascript

As PHP typically outputs data to a website, we recommend, if possible, doing processing client side using the CASS JavaScript Library. However, this may be impractical, as the server may have access to data that is not available to the client.

## Consuming Data

If you are only intending to consume CASS data, the path is much simpler.

1. Fetch the resources and decode them as JSON, then use them normally
```php
<?php
 $json = json_decode(file_get_contents('https://sandbox.cassproject.org/api/custom/data/schema.cassproject.org.0.2.Framework/ce4c0e41-f24c-407d-95af-047bfee429bf'));
 echo $json->name;
 echo "<ul>";
 foreach ($json->competency as $comp){
  echo "<li>" . json_decode(file_get_contents($comp))->name . "</li>";
 }
 echo "</ul>";
?>
```