package com.recochapp;

import com.recochapp.model.JugadorPerfil;
import com.recochapp.model.Usuario;
import com.recochapp.repository.JugadorPerfilRepository;
import com.recochapp.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JugadorPerfilRepository perfilRepository;

    @Override
    public void run(String... args) throws Exception {
        // Sembrar datos si no existe Falcao
        if (perfilRepository.findByEmail("tigre@ejemplo.com").isEmpty()) {
            System.out.println("Sembrando base de datos con perfiles de ejemplo...");

            List<String> correos = Arrays.asList(
                "pibe@ejemplo.com", "linda@ejemplo.com", "escorpion@ejemplo.com",
                "tigre@ejemplo.com", "james@ejemplo.com", "tino@ejemplo.com",
                "cata@ejemplo.com", "mario@ejemplo.com", "coloso@ejemplo.com", "lucho@ejemplo.com"
            );
            
            for (String email : correos) {
                perfilRepository.findByEmail(email).ifPresent(p -> perfilRepository.delete(p));
            }

            Usuario u1 = new Usuario();
            u1.setNombre_completo("Carlos Valderrama");
            u1.setEmail("pibe@ejemplo.com");
            u1.setPassword("1234");
            u1 = usuarioRepository.save(u1);

            JugadorPerfil p1 = new JugadorPerfil();
            p1.setUsuarioId(u1.getId_usuario());
            p1.setNombreCompleto(u1.getNombre_completo());
            p1.setEmail(u1.getEmail());
            p1.setPosiciones(Arrays.asList("MCO", "MC"));
            p1.setUbicacion("Comuna 12 - Cabecera del Llano");
            p1.setPiernaHabil("Derecha");
            p1.setEdad(35);
            p1.setSexo("Masculino");
            // p1.setClubId(null);
            perfilRepository.save(p1);

            Usuario u2 = new Usuario();
            u2.setNombre_completo("Linda Caicedo");
            u2.setEmail("linda@ejemplo.com");
            u2.setPassword("1234");
            u2 = usuarioRepository.save(u2);

            JugadorPerfil p2 = new JugadorPerfil();
            p2.setUsuarioId(u2.getId_usuario());
            p2.setNombreCompleto(u2.getNombre_completo());
            p2.setEmail(u2.getEmail());
            p2.setPosiciones(Arrays.asList("EI", "DC"));
            p2.setUbicacion("Comuna 1 - Norte");
            p2.setPiernaHabil("Derecha");
            p2.setEdad(20);
            p2.setSexo("Femenino");
            // p2.setClubId(null);
            perfilRepository.save(p2);

            Usuario u3 = new Usuario();
            u3.setNombre_completo("Rene Higuita");
            u3.setEmail("escorpion@ejemplo.com");
            u3.setPassword("1234");
            u3 = usuarioRepository.save(u3);

            JugadorPerfil p3 = new JugadorPerfil();
            p3.setUsuarioId(u3.getId_usuario());
            p3.setNombreCompleto(u3.getNombre_completo());
            p3.setEmail(u3.getEmail());
            p3.setPosiciones(Arrays.asList("POR"));
            p3.setUbicacion("Comuna 10 - Provenza");
            p3.setPiernaHabil("Derecha");
            p3.setEdad(40);
            p3.setSexo("Masculino");
            // p3.setClubId(null);
            perfilRepository.save(p3);

            Usuario u4 = new Usuario();
            u4.setNombre_completo("Radamel Falcao");
            u4.setEmail("tigre@ejemplo.com");
            u4.setPassword("1234");
            u4 = usuarioRepository.save(u4);

            JugadorPerfil p4 = new JugadorPerfil();
            p4.setUsuarioId(u4.getId_usuario());
            p4.setNombreCompleto(u4.getNombre_completo());
            p4.setEmail(u4.getEmail());
            p4.setPosiciones(Arrays.asList("DC"));
            p4.setUbicacion("Comuna 5 - García Rovira");
            p4.setPiernaHabil("Derecha");
            p4.setEdad(38);
            p4.setSexo("Masculino");
            perfilRepository.save(p4);

            Usuario u5 = new Usuario();
            u5.setNombre_completo("James Rodriguez");
            u5.setEmail("james@ejemplo.com");
            u5.setPassword("1234");
            u5 = usuarioRepository.save(u5);

            JugadorPerfil p5 = new JugadorPerfil();
            p5.setUsuarioId(u5.getId_usuario());
            p5.setNombreCompleto(u5.getNombre_completo());
            p5.setEmail(u5.getEmail());
            p5.setPosiciones(Arrays.asList("MCO", "MD"));
            p5.setUbicacion("Comuna 12 - Cabecera del Llano");
            p5.setPiernaHabil("Izquierda");
            p5.setEdad(32);
            p5.setSexo("Masculino");
            perfilRepository.save(p5);

            Usuario u6 = new Usuario();
            u6.setNombre_completo("Faustino Asprilla");
            u6.setEmail("tino@ejemplo.com");
            u6.setPassword("1234");
            u6 = usuarioRepository.save(u6);

            JugadorPerfil p6 = new JugadorPerfil();
            p6.setUsuarioId(u6.getId_usuario());
            p6.setNombreCompleto(u6.getNombre_completo());
            p6.setEmail(u6.getEmail());
            p6.setPosiciones(Arrays.asList("DC", "EI"));
            p6.setUbicacion("Comuna 4 - Occidental");
            p6.setPiernaHabil("Derecha");
            p6.setEdad(54);
            p6.setSexo("Masculino");
            perfilRepository.save(p6);

            Usuario u7 = new Usuario();
            u7.setNombre_completo("Catalina Usme");
            u7.setEmail("cata@ejemplo.com");
            u7.setPassword("1234");
            u7 = usuarioRepository.save(u7);

            JugadorPerfil p7 = new JugadorPerfil();
            p7.setUsuarioId(u7.getId_usuario());
            p7.setNombreCompleto(u7.getNombre_completo());
            p7.setEmail(u7.getEmail());
            p7.setPosiciones(Arrays.asList("MCO", "DC"));
            p7.setUbicacion("Comuna 13 - Oriental");
            p7.setPiernaHabil("Izquierda");
            p7.setEdad(34);
            p7.setSexo("Femenino");
            perfilRepository.save(p7);

            Usuario u8 = new Usuario();
            u8.setNombre_completo("Mario Yepes");
            u8.setEmail("mario@ejemplo.com");
            u8.setPassword("1234");
            u8 = usuarioRepository.save(u8);

            JugadorPerfil p8 = new JugadorPerfil();
            p8.setUsuarioId(u8.getId_usuario());
            p8.setNombreCompleto(u8.getNombre_completo());
            p8.setEmail(u8.getEmail());
            p8.setPosiciones(Arrays.asList("CB"));
            p8.setUbicacion("Comuna 16 - Lagos del Cacique");
            p8.setPiernaHabil("Derecha");
            p8.setEdad(48);
            p8.setSexo("Masculino");
            perfilRepository.save(p8);

            Usuario u9 = new Usuario();
            u9.setNombre_completo("Freddy Rincon");
            u9.setEmail("coloso@ejemplo.com");
            u9.setPassword("1234");
            u9 = usuarioRepository.save(u9);

            JugadorPerfil p9 = new JugadorPerfil();
            p9.setUsuarioId(u9.getId_usuario());
            p9.setNombreCompleto(u9.getNombre_completo());
            p9.setEmail(u9.getEmail());
            p9.setPosiciones(Arrays.asList("MC", "MCD"));
            p9.setUbicacion("Comuna 6 - La Concordia");
            p9.setPiernaHabil("Derecha");
            p9.setEdad(55);
            p9.setSexo("Masculino");
            perfilRepository.save(p9);

            Usuario u10 = new Usuario();
            u10.setNombre_completo("Luis Diaz");
            u10.setEmail("lucho@ejemplo.com");
            u10.setPassword("1234");
            u10 = usuarioRepository.save(u10);

            JugadorPerfil p10 = new JugadorPerfil();
            p10.setUsuarioId(u10.getId_usuario());
            p10.setNombreCompleto(u10.getNombre_completo());
            p10.setEmail(u10.getEmail());
            p10.setPosiciones(Arrays.asList("EI", "MI"));
            p10.setUbicacion("Comuna 15 - Centro");
            p10.setPiernaHabil("Derecha");
            p10.setEdad(27);
            p10.setSexo("Masculino");
            perfilRepository.save(p10);

            System.out.println("Perfiles de ejemplo creados exitosamente.");
        }
    }
}
