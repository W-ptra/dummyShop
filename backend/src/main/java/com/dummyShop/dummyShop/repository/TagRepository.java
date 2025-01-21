package com.dummyShop.dummyShop.repository;

import com.dummyShop.dummyShop.model.Tag;
import jakarta.persistence.Tuple;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface TagRepository extends JpaRepository<Tag,Long> {

    @Query("SELECT t, COUNT(p) FROM Tag t LEFT JOIN t.productSet p GROUP BY t ORDER BY COUNT(p) DESC")
    List<Tuple> getAll(
            Pageable pageable
    );

    @Query("SELECT t, COUNT(p) FROM Tag t LEFT JOIN t.productSet p WHERE t.name LIKE :name% GROUP BY t ORDER BY COUNT(p) DESC")
    List<Tuple> getAllTagByName(
      @Param("name") String name,
      Pageable pageable
    );

    @Query("SELECT t FROM Tag t JOIN FETCH t.productSet " +
            "WHERE t.name = :name")
    Tag getTagAndProductList(
            @Param("name") String name
    );

    @Query("SELECT t FROM Tag t WHERE t.name IN (:names)")
    Set<Tag> getTagByMultipleName(
            @Param("names") Set<String> names
    );
}
