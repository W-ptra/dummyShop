package com.dummyShop.dummyShop.repository;

import com.dummyShop.dummyShop.model.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface TagRepository extends JpaRepository<Tag,Long> {

    @Query("SELECT t FROM Tag t WHERE t.name LIKE :name%")
    List<Tag> getTagByName(
      @Param("name") String name,
      Pageable pageable
    );

    @Query("SELECT t FROM Tag t WHERE t.name IN (:names)")
    Set<Tag> getTagByMultipleName(
            @Param("names") Set<String> names
    );
}
