package com.recochapp;

import com.recochapp.model.Club;
import com.recochapp.model.JugadorPerfil;
import com.recochapp.model.Usuario;
import com.recochapp.repository.JugadorPerfilRepository;
import com.recochapp.repository.UsuarioRepository;
import com.recochapp.repository.ClubRepository;
import com.recochapp.repository.TorneoRepository;
import com.recochapp.repository.RecochaRepository;
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

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private TorneoRepository torneoRepository;

    @Autowired
    private RecochaRepository recochaRepository;

    @Override
    public void run(String... args) throws Exception {
        if (clubRepository.count() == 0) {
            System.out.println("Los clubes por defecto de Colombia no están presentes. Realizando siembra limpia de datos...");

            usuarioRepository.deleteAll();
            perfilRepository.deleteAll();
            clubRepository.deleteAll();
            torneoRepository.deleteAll();
            recochaRepository.deleteAll();

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
            p1.setApodo("elpibe10");
            p1.setEdad(35);
            p1.setSexo("Masculino");
            p1.setClubNombre("Junior de Barranquilla");
            p1.setUbicacion("Barranquilla");
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
            p2.setApodo("lindac18");
            p2.setEdad(20);
            p2.setSexo("Femenino");
            p2.setClubNombre("Deportivo Cali");
            p2.setUbicacion("Cali");
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
            p3.setApodo("escorpion1");
            p3.setEdad(40);
            p3.setSexo("Masculino");
            p3.setClubNombre("Atlético Nacional");
            p3.setUbicacion("Medellín");
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
            p4.setApodo("tigre9");
            p4.setEdad(38);
            p4.setSexo("Masculino");
            p4.setClubNombre("Millonarios FC");
            p4.setUbicacion("Bogotá");
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
            p5.setApodo("james10");
            p5.setEdad(32);
            p5.setSexo("Masculino");
            p5.setClubNombre("Independiente Santa Fe");
            p5.setUbicacion("Medellín");
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
            p6.setApodo("eltino11");
            p6.setEdad(54);
            p6.setSexo("Masculino");
            p6.setClubNombre("Atlético Nacional");
            p6.setUbicacion("Tuluá");
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
            p7.setApodo("cata11");
            p7.setEdad(34);
            p7.setSexo("Femenino");
            p7.setClubNombre("América de Cali");
            p7.setUbicacion("Medellín");
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
            p8.setApodo("supermario3");
            p8.setEdad(48);
            p8.setSexo("Masculino");
            p8.setClubNombre("Deportivo Cali");
            p8.setUbicacion("Cali");
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
            p9.setApodo("coloso19");
            p9.setEdad(55);
            p9.setSexo("Masculino");
            p9.setClubNombre("Millonarios FC");
            p9.setUbicacion("Cali");
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
            p10.setApodo("lucho7");
            p10.setEdad(27);
            p10.setSexo("Masculino");
            p10.setClubNombre("Junior de Barranquilla");
            p10.setUbicacion("Barranquilla");
            perfilRepository.save(p10);

            System.out.println("Perfiles de ejemplo creados exitosamente.");

            System.out.println("Sembrando clubes por defecto de Colombia...");
            Club c1 = new Club();
            c1.setName("Atlético Nacional");
            c1.setAdmin("escorpion1");
            c1.setMembers(Arrays.asList("escorpion1", "eltino11"));
            clubRepository.save(c1);

            Club c2 = new Club();
            c2.setName("Millonarios FC");
            c2.setAdmin("tigre9");
            c2.setMembers(Arrays.asList("tigre9", "coloso19"));
            clubRepository.save(c2);

            Club c3 = new Club();
            c3.setName("América de Cali");
            c3.setAdmin("cata11");
            c3.setMembers(Arrays.asList("cata11", "lindac18"));
            clubRepository.save(c3);

            Club c4 = new Club();
            c4.setName("Junior de Barranquilla");
            c4.setAdmin("elpibe10");
            c4.setMembers(Arrays.asList("elpibe10", "lucho7"));
            clubRepository.save(c4);

            Club c5 = new Club();
            c5.setName("Deportivo Cali");
            c5.setAdmin("supermario3");
            c5.setMembers(Arrays.asList("supermario3", "lindac18"));
            clubRepository.save(c5);

            Club c6 = new Club();
            c6.setName("Independiente Santa Fe");
            c6.setAdmin("james10");
            c6.setMembers(Arrays.asList("james10"));
            clubRepository.save(c6);

            System.out.println("Clubes de ejemplo creados exitosamente.");
        } else {
            System.out.println("La base de datos ya contiene clubes. Omitiendo siembra inicial.");
        }
    }
}
