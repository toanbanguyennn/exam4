package com.example.exem4.controller;

import com.example.exem4.model.City;
import com.example.exem4.model.Country;
import com.example.exem4.service.ICityService;
import com.example.exem4.service.ICountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class CityController {
    @Autowired
    public ICityService iCityService;
    @Autowired
    public ICountryService iCountryService;

    @GetMapping("/countries")
    public ResponseEntity<List<Country>> findAllCountries() {
        return new ResponseEntity<>(iCountryService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/cities")
    public ResponseEntity<List<City>> findAllCities() {
        return new ResponseEntity<>(iCityService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/cities")
    public ResponseEntity<City> create(@RequestBody City city) {
        return new ResponseEntity<>(iCityService.save(city), HttpStatus.CREATED);
    }

    @PutMapping("/cities/{id}")
    public ResponseEntity<City> update(@RequestBody City city) {
        Optional<City> cityUpdate = iCityService.findById(city.getId());
        if (cityUpdate.isPresent()) {
            return new ResponseEntity<>(iCityService.save(city), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/cities/{id}")
    public ResponseEntity<City> delete(@PathVariable Long id) {
        iCityService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/cities/{id}")
    public ResponseEntity<City> findById(@PathVariable Long id) {
        Optional<City> findById = iCityService.findById(id);
        if (findById.isPresent()) {
            return new ResponseEntity<>(findById.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}